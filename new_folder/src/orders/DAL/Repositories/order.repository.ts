import { EntityRepository } from '@mikro-orm/core';
import { Order } from '../Entities/order.entity';

export class OrderRepository extends EntityRepository<Order> {
  // Custom repository methods will go here in the future
}
