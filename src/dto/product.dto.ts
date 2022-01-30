import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Product } from '../entities';

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

  /**
   * Create product DTO
   * @param {Partial<ProductDTO>} dto
   * @returns {ProductDTO} Product
   */
  public static from(dto: Partial<ProductDTO>) {
    let object = new ProductDTO();
    object = <ProductDTO>dto;
    return object;
  }

  /**
   * Convert entity to DTO
   * @param {Product} entity
   * @returns {ProductDTO} ProductDTO
   */
  public static fromEntity(entity: Product) {
    if (entity) {
      return this.from({
        id: entity.id,
        description: entity.Description,
        model: entity.Model,
        brand: entity.Brand,
      });
    } else {
      //Pass exception if product not found
      throw new NotFoundException('Product not found');
    }
  }

  /**
   * Convert DTO to entity
   * @returns {Product} entity
   */
  public toEntity() {
    // New product entity
    const entity = new Product();
    entity.Brand = this.brand;
    entity.Description = this.description;
    entity.Model = this.model;
    return entity;
  }
}
