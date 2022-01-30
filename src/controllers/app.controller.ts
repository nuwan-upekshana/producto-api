import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { APIPayload } from 'src/interface';
import { AppService, ProductService } from '../services';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  getHello() {
    const payload = this.appService.getHello();
    const apiPayload: APIPayload = {
      message: 'productO API Base Endpoint',
      payload,
    };
    return apiPayload;
  }

  @Get('seed/products')
  seedProducts() {
    const payload = this.productService.seed();
    const apiPayload: APIPayload = {
      message: 'Product List seeded',
      payload,
    };
    return apiPayload;
  }
}
