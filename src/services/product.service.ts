import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { getUUID } from '../common/uuid';
import { ProductDTO } from '../dto';
import { PaginationQuaryDTO } from '../dto/pagination-quary.dto';
import { Product } from '../entities';
import { IPaginatedResult } from '../interface/pagination-result.interface';
import _ from 'lodash';

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
   * Get all products
   * @param {PaginationQuaryDTO} pQuery
   * @returns {Promise} IPaginatedResult
   */
  async getAll(pQuery: PaginationQuaryDTO): Promise<IPaginatedResult> {
    return new Promise((resolve, reject) => {
      const productList = this.productRepo
        .getAll()
        .map((pro) => ProductDTO.fromEntity(pro));
      const { page, sizePerPage, searchQuary, filterQuary, pagination } =
        pQuery;
      let filteredData = [];
      if (searchQuary && searchQuary.searchText !== '') {
        filteredData = productList.filter((dt) => {
          const findCol = searchQuary.coloumns.filter((col) => {
            return dt[col].toString().includes(searchQuary.searchText);
          });

          if (findCol.length > 0) return true;
          return false;
        });
      } else {
        filteredData = productList;
      }

      if (filterQuary && filterQuary.length > 0) {
        filteredData = filteredData.filter((item) => {
          const findCol = filterQuary.filter((filter) => {
            if (typeof item[filter.coloumn] === 'object') {
              return item[filter.coloumn].id.toString().includes(filter.value);
            } else {
              return item[filter.coloumn].toString().includes(filter.value);
            }
          });
          if (findCol.length > 0 && findCol.length === filterQuary.length)
            return true;
          return false;
        });
      }

      let paginatedResult: IPaginatedResult;
      if (pagination) {
        paginatedResult = {
          results: [],
          sizePerPage: sizePerPage,
          page: page,
          totalDocs: filteredData.length,
          totalPages: Math.trunc(filteredData.length / sizePerPage) + 1,
        };
        const results = _(filteredData)
          .drop((page - 1) * sizePerPage) // page in drop function starts from 0
          .take(sizePerPage) // limit 2
          .value();

        paginatedResult.results = results;
      } else {
        paginatedResult = {
          results: filteredData,
          sizePerPage: 0,
          page: 0,
          totalDocs: filteredData.length,
          totalPages: 0,
        };
      }
      resolve(paginatedResult);
    });
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

  /**
   * Delete a product in the InMemory DB
   * @param {string} id
   * @returns {Promise} boolean
   */
  public async delete(id: string): Promise<{ deleted: boolean }> {
    // Submit delete
    this.productRepo.deleteAsync(id);
    return { deleted: true };
  }
}
