import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Product } from 'src/entities';

export class ProductDTO implements Readonly<ProductDTO> {
  id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  model: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  brand: string;

  public static from(dto: Partial<ProductDTO>) {
    let object = new ProductDTO();
    object = <ProductDTO>dto;
    return object;
  }

  public static fromEntity(entity: Product) {
    return this.from({
      id: entity.Id,
      description: entity.Description,
      model: entity.Model,
      brand: entity.Brand,
    });
  }

  public toEntity() {
    const entity = new Product();
    entity.Brand = this.brand;
    entity.Description = this.description;
    entity.Model = this.model;
    return entity;
  }
}
