import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MomoService } from './momo.service';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Post('pay')
  async pay(
    @Body() body: { phoneNumber: string; amount: string; currency: string },
  ): Promise<{ referenceId: string }> {
    const referenceId = await this.momoService.initiatePayment(
      body.amount,
      body.currency,
      body.phoneNumber,
    );
    return { referenceId };
  }

  @Get('status')
  async status(@Query('ref') referenceId: string) {
    return this.momoService.checkPaymentStatus(referenceId);
  }
}
