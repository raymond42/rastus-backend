import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { status: string; message: string; docs: string } {
    return {
      status: 'OK',
      message: 'Welcome to Rastus E-commerce API 👋',
      docs: '/api-docs',
    };
  }
}
