import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { FilterQuary, SearchQuary } from '../interface';

export class PaginationQuaryDTO implements Readonly<PaginationQuaryDTO> {
  @ApiProperty({ required: true })
  @Transform((obj) => parseInt(obj.value))
  page: number;

  @ApiProperty({ required: true })
  @Transform((obj) => parseInt(obj.value))
  sizePerPage: number;

  @ApiProperty({ required: true })
  @Transform((obj) => JSON.parse(obj.value))
  searchQuary: SearchQuary;

  @ApiProperty({ required: true })
  @Transform((obj) => JSON.parse(obj.value))
  filterQuary: FilterQuary[];

  @ApiProperty({ required: true })
  @Transform((obj) => obj.value === 'true')
  pagination: boolean;
}
