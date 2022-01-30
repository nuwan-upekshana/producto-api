import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      timestamp: new Date().toISOString(),
      service: 'productO API',
      version: '1.0',
      status: 'Active',
    };
  }
}
