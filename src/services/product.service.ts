import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { getUUID } from '../common/uuid';
import { ProductDTO } from '../dto';
import { PaginationQuaryDTO } from '../dto/pagination-quary.dto';
import { Product } from '../entities';
import { IPaginatedResult } from '../interface/pagination-result.interface';

@Injectable()
export class ProductService {
  constructor(private productRepo: InMemoryDBService<Product>) {}

  /**
   * Get a product using id form the InMemory DB
   * @param {string} id
   * @returns {Promise} ProductDTO
   */
  async get(id: string): Promise<ProductDTO> {
    return await lastValueFrom(this.productRepo.getAsync(id)).then((data) =>
      ProductDTO.fromEntity(data),
    );
  }

  /**
   * Create a product in the InMemory DB
   * @param {ProductDTO} dto
   * @returns {Promise} ProductDTO
   */
  public async create(dto: ProductDTO) {
    // Convert DTO to entity
    const entity = dto.toEntity();
    //get document id
    entity.id = getUUID();
    return await lastValueFrom(this.productRepo.createAsync(entity)).then((e) =>
      ProductDTO.fromEntity(e),
    );
  }

  /**
   * Update a product in the InMemory DB
   * @param {string} id
   * @param {ProductDTO} dto
   * @returns {Promise} ProductDTO
   */
  public async update(id: string, dto: ProductDTO): Promise<ProductDTO> {
    // Get recode
    const repoData = this.productRepo.get(id);
    // Update recode object
    const updatedRecode = { ...repoData, ...dto.toEntity() };
    // Submit update
    this.productRepo.updateAsync(updatedRecode);
    return ProductDTO.fromEntity(updatedRecode);
  }
}
