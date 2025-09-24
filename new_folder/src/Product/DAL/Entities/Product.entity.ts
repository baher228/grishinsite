import { Entity, Property, OptionalProps } from '@mikro-orm/core';
import { ProductRepository } from '../Repositories/Product.repository';
import { BaseEntity } from '../../../DAL/Entities/BaseEntity';

@Entity({ tableName: 'products', repository: () => ProductRepository })
export class Product extends BaseEntity<'description' | 'image'> {
  @Property()
  public name!: string;

  @Property()
  public category!: "Bath & Plumbing" | "Landscaping" | "Storage & Shelving" | "Lighting" |"Doors & Security" | "Screws & Fixings";

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
