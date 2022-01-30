import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Test, TestingModule } from '@nestjs/testing';
import { getUUID } from '../src/common/uuid';
import { ProductController } from '../src/controllers';
import { ProductDTO } from '../src/dto';
import { Product } from '../src/entities/product.entity';
import { ProductService } from '../src/services';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  let productRepo: InMemoryDBService<Product>;

  let productId = 'bed78922-9135-4ad8-bfb3-d11180196b08';
  let product = new ProductDTO();
  product.brand = 'Dell';
  product.model = 'Inspiron 5410';
  product.description =
    'Dell Inspiron 5410 14" Full HD 2-in-1 Laptop (256GB) [Intel i5]';

  let productUpdate = new ProductDTO();
  product.brand = 'HP';
  product.model = 'Inspiron 5410';
  product.description = 'Hp 5410 14" Full HD 2-in-1 Laptop (256GB) [Intel i5]';

  beforeEach(() => {
    productService = new ProductService(productRepo);
    productController = new ProductController(productService);
  });

  describe('create', () => {
    it('Should return created product with #ID', async () => {
      const result = new Promise<ProductDTO>((resolve, reject) => {
        product.id = productId;
        resolve(product);
      });
      jest.spyOn(productService, 'create').mockImplementation(() => result);
      expect(await productController.create(product)).toHaveProperty(
        'payload.id',
      );
    });
  });

  describe('update', () => {
    it('Should return updated product', async () => {
      const result = new Promise<ProductDTO>((resolve, reject) => {
        resolve(productUpdate);
      });
      jest.spyOn(productService, 'update').mockImplementation(() => result);
      expect(
        await productController.update(productId, productUpdate),
      ).toHaveProperty('payload.brand', productUpdate.brand);
    });
  });

  describe('delete', () => {
    it('Should delete product', async () => {
      const result = new Promise<{ deleted: boolean }>((resolve, reject) => {
        resolve({ deleted: true });
      });
      jest.spyOn(productService, 'delete').mockImplementation(() => result);
      expect(await productController.delete(productId)).toHaveProperty(
        'payload.deleted',
        true,
      );
    });
  });
});
