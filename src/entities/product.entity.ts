import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Product implements InMemoryDBEntity {
  public id: string;
  public Description: string;
  public Model: string;
  public Brand: string;
}
