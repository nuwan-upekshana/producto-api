import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { APIPayload } from 'src/interface';
import { AppService, ProductService, UserService } from '../services';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
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

  @Get('seed/users')
  seedUsers() {
    const payload = this.userService.seed();
    const apiPayload: APIPayload = {
      message: 'Admin User seeded',
      payload,
    };
    return apiPayload;
  }
}
