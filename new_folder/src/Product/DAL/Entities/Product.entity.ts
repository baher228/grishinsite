import { Entity, Property } from '@mikro-orm/core';
import { ProductRepository } from '../Repositories/Product.repository';
import { BaseEntity } from '../../../../src/DAL/Entities/BaseEntity';

@Entity({ tableName: 'product', repository: () => ProductRepository })
export class Product extends BaseEntity {
  @Property()
  public name: string;

  @Property()
  public description: string;

  @Property()
  public price: number;

  constructor(name: string, description: string, price: number) {
    super();
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
