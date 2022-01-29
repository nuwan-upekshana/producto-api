import { BaseEntity } from './base.entity';

export class Product extends BaseEntity {
  public Id: string;
  public Description: string;
  public Model: string;
  public Brand: string;
}
