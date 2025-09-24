import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { RequiredEntityData } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

import { OrderRepository } from './DAL/Repositories/order.repository';
import { ProductService } from '../Product/Product.service';
import { Order, OrderStatus } from './DAL/Entities/order.entity';
import Stripe from 'stripe';
import { OrderItem } from './DAL/Entities/order-item.entity';
import { Product } from '../Product/DAL/Entities/Product.entity';


@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
    private readonly em: EntityManager,
  ) {}


  /**
   * Creates an order from a completed Stripe Checkout Session.
   * This is the primary method for order creation, triggered by a webhook.
   */
  async createOrderFromStripeSession(session: Stripe.Checkout.Session) {
    if (!session.customer_details?.email) {
      throw new InternalServerErrorException(
        'Customer email not available in session',
      );
    }
    if (!session.metadata?.items) {
      throw new InternalServerErrorException('Session metadata is missing items');
    }
    if (!session.amount_total) {
      throw new InternalServerErrorException('Session is missing amount_total');
    }

    const order = this.em.create(Order, {
      customerEmail: session.customer_details.email,
      stripeCheckoutSessionId: session.id,
      totalAmount: session.amount_total,
      status: OrderStatus.PAID,
    } as RequiredEntityData<Order>);



    const lineItems: { productId: number; quantity: number }[] = JSON.parse(
      session.metadata.items,
    );

    for (const item of lineItems) {
      const product = await this.productService.getProductById(item.productId);
      if (!product) {
        this.logger.error(
          `Product with ID ${item.productId} not found. Skipping item for order ${session.id}.`,
        );
        continue;
      }

      const orderItem = this.em.create(OrderItem, {
        product: this.em.getReference(Product, item.productId),
        quantity: item.quantity,
        priceAtPurchase: Number(product.price) * 100, // Store price in minor units
        order: order,
      } as RequiredEntityData<OrderItem>);


      order.items.add(orderItem);

      // TODO: Implement inventory management
      // product.stock -= item.quantity;
      // await this.productService.updateProduct(product.id, { stock: product.stock });
    }

    await this.em.persistAndFlush(order);

    this.logger.log(`Created order ${order.id} for ${order.customerEmail}`);
    return order;
  }

  /**
   * Placeholder for manual order creation.
   * The primary flow is through the webhook.
   */
  async create(/* createOrderDto: any */) {
    this.logger.warn('Manual order creation is not implemented.');
    throw new Error('Manual order creation not implemented.');
  }

  /**
   * Finds all orders.
   */
  async findAll() {
    return this.orderRepository.findAll();
  }

  /**
   * Finds a single order by its ID.
   */
  async findOne(id: number) {
    const order = await this.orderRepository.findOne({ id });
    if (!order) {
      // throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}
