import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getEndpoint } from '../common/endpoint';
import { ProductDTO } from '../dto';
import { APIPayload } from '../interface';
import { ProductService } from '../services';

@ApiTags('Product')
@Controller(getEndpoint('product'))
export class ProductController {
  constructor(private readonly productServ: ProductService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const payload = await this.productServ.get(id);
    const apiPayload: APIPayload = {
      message: 'The Product has been found.',
      payload,
    };
    return apiPayload;
  }

  @Post()
  async create(@Body() port: ProductDTO): Promise<APIPayload> {
    // Pass products to the service
    const payload = await this.productServ.create(port);

    // Payload
    const apiPayload: APIPayload = {
      message: 'The Product has been successfully created',
      payload: payload,
    };
    return apiPayload;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: ProductDTO,
  ): Promise<APIPayload> {
    // Pass products to the service
    const payload = await this.productServ.update(id, dto);
    //Payload
    const apiPayload: APIPayload = {
      message: 'The Product has been successfully updated',
      payload,
    };
    return apiPayload;
  }
}
