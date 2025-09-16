import { Entity, Property } from '@mikro-orm/core';
import { ProductRepository } from '../Repositories/Product.repository';
import { BaseEntity } from '../../../DAL/Entities/BaseEntity';

@Entity({ tableName: 'products', repository: () => ProductRepository })
export class Product extends BaseEntity {

  @Property()
  public name!: string;

  @Property()
  public category!: string;

  @Property({ nullable: true })
  public brand: string | null = null;

  @Property({ nullable: true })
  public description: string | null = null;

  @Property({ nullable: true })
  public image: string | null = null;

  @Property()
  public price!: number;

  @Property()
  public stock!: number;
}
