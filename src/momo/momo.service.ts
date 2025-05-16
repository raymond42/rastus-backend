import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MomoService {
  private baseUrl = process.env.MOMO_BASE_URL;
  private subscriptionKey = process.env.MOMO_SUBSCRIPTION_KEY;
  private userId = process.env.MOMO_USER_ID;
  private apiKey = process.env.MOMO_API_KEY;
  private targetEnv = process.env.MOMO_ENV || 'sandbox';

  async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.userId}:${this.apiKey}`).toString(
      'base64',
    );

    const res = await axios.post(
      `${this.baseUrl}/collection/token/`,
      {},
      {
        headers: {
          'Ocp-Apim-Subscription-Key': this.subscriptionKey,
          Authorization: `Basic ${auth}`,
        },
      },
    );
    return res.data.access_token;
  }

  async initiatePayment(
    amount: string,
    currency: string,
    phoneNumber: string,
  ): Promise<string> {
    const referenceId = uuidv4();
    const accessToken = await this.getAccessToken();

    try {
      await axios.post(
        `${this.baseUrl}/collection/v1_0/requesttopay`,
        {
          amount,
          currency: currency.toUpperCase(),
          externalId: referenceId,
          payer: {
            partyIdType: 'MSISDN',
            partyId: phoneNumber,
          },
          payerMessage: 'Order Payment',
          payeeNote: 'Thanks for your purchase',
        },
        {
          headers: {
            'X-Reference-Id': referenceId,
            'X-Target-Environment': this.targetEnv,
            'Ocp-Apim-Subscription-Key': this.subscriptionKey,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return referenceId;
    } catch (error) {
      const status = error.response?.status || 500;
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Unknown error from MoMo API';

      console.error('MoMo initiatePayment Error:', {
        status,
        message,
        data: error.response?.data,
      });

      throw new Error(`MoMo payment failed [${status}]: ${message}`);
    }
  }

  async checkPaymentStatus(referenceId: string): Promise<any> {
    const accessToken = await this.getAccessToken();

    const res = await axios.get(
      `${this.baseUrl}/collection/v1_0/requesttopay/${referenceId}`,
      {
        headers: {
          'X-Target-Environment': this.targetEnv,
          'Ocp-Apim-Subscription-Key': this.subscriptionKey,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.data;
  }
}
