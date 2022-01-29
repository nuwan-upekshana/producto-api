import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getEndpoint } from 'src/common/endpoint';
import { APIPayload } from 'src/interface';
import { ProductService } from '../services';

@ApiTags('Product')
@Controller(getEndpoint('product'))
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @Get()
  async getHello(): Promise<APIPayload> {
    const payload = await this.appService.getHello();
    const apiPayload: APIPayload = {
      message: 'The product has been found.',
      payload,
    };
    return apiPayload;
  }
}
