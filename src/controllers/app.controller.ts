import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { APIPayload } from 'src/interface';
import { AppService } from '../services';

@ApiTags('Product')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const payload = this.appService.getHello();
    const apiPayload: APIPayload = {
      message: 'productO API Base Endpoint',
      payload,
    };
    return apiPayload;
  }
}
