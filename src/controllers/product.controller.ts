import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/jwt.guard';
import { PaginationQuaryDTO } from '../dto/pagination-quary.dto';
import { ProductDTO } from '../dto';
import { APIPayload } from '../interface';
import { ProductService } from '../services';

@ApiTags('Product')
@Controller('product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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

  @Get()
  async getAll(@Query() quary: PaginationQuaryDTO): Promise<APIPayload> {
    const payload = await this.productServ.getAll(quary);
    const apiPayload: APIPayload = {
      message: 'The Products has been successfully fetched',
      payload: payload,
    };
    return apiPayload;
  }

  @Post()
  async create(@Body() product: ProductDTO): Promise<APIPayload> {
    // Pass product to the service
    const payload = await this.productServ.create(product);

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
    // Pass product to the service
    const payload = await this.productServ.update(id, dto);
    //Payload
    const apiPayload: APIPayload = {
      message: 'The Product has been successfully updated',
      payload,
    };
    return apiPayload;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<APIPayload> {
    // Pass product id to the service
    const payload = await this.productServ.delete(id);
    //Payload
    const apiPayload: APIPayload = {
      message: 'The Product has been successfully deleted',
      payload,
    };
    return apiPayload;
  }
}
