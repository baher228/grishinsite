import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../DAL/Entities/BaseEntity';
import { Order } from './order.entity';
import { Product } from '../../../Product/DAL/Entities/Product.entity';

@Entity({ tableName: 'order_items' })
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Order)
  order!: Order;

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  quantity!: number;

  @Property()
  priceAtPurchase!: number; // In minor units, price of a single item
}
