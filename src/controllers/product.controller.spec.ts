import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '.';
import { ProductService } from '../services';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productController.getHello()).toBe('Hello World!');
    });
  });
});
