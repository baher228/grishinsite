import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../DAL/Entities/BaseEntity';
import { OrderRepository } from '../Repositories/order.repository';
import { OrderItem } from './order-item.entity';


export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  CANCELLED = 'cancelled',
}

@Entity({ tableName: 'orders', repository: () => OrderRepository })
export class Order extends BaseEntity {
  @Property()
  customerEmail!: string;

  @Property()
  totalAmount!: number; // In minor units (e.g., pence)

  @Property()
  status: OrderStatus = OrderStatus.PENDING;

  @Property({ unique: true })
  stripeCheckoutSessionId!: string;

  @OneToMany(() => OrderItem, (item) => item.order, { eager: true })
  items = new Collection<OrderItem>(this);
}
