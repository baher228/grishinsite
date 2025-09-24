import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateCheckoutSessionDto } from './DTO/create-checkout-session.dto';

import { ProductService } from '../Product/Product.service'; 

import { Product } from 'src/Product/DAL/Entities/Product.entity';


@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly productService: ProductService,
  ) {
    const secret = this.config.get<string>('STRIPE_SECRET_KEY') ?? '';
    if (!secret) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    this.stripe = new Stripe(secret);
  }

  private async computeAmountInMinorUnits(
    items: { productId: number; quantity: number }[],
  ): Promise<number> {
    if (!items.length) return 0;

    let total = 0;
    for (const item of items) {
      const product = await this.productService.getProductById(item.productId);
      if (!product) {
        throw new InternalServerErrorException(`Product not found: ${item.productId}`);
      }
      const unitAmount = Number(product.price);
      if (!Number.isInteger(unitAmount) || unitAmount < 0) {
        throw new InternalServerErrorException(
          `Invalid unit amount for product ${item.productId}`,
        );
      }
      total += unitAmount * item.quantity;
    }
    return total*100; // Product price is stored in pounds
  }


  /**
   * Optional path using Stripe Checkout (hosted page).
   */
  async createCheckoutSession(dto: CreateCheckoutSessionDto) {
    const currency = (dto.currency || 'usd').toLowerCase();
    const amountCheck = await this.computeAmountInMinorUnits(dto.lineItems);
    if (amountCheck <= 0) {
      throw new InternalServerErrorException('Computed amount must be greater than 0');
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const li of dto.lineItems) {
      const p = await this.productService.getProductById(li.productId);
      if (!p) {
        throw new InternalServerErrorException(`Product not found: ${li.productId}`);
      }
      const unitAmount = Number(p.price);
      line_items.push({
        quantity: li.quantity,
        price_data: {
          currency,
          unit_amount: unitAmount * 100,
          product_data: {
            name: p.name ?? `Product ${p.id}`,

            // You can pass images, descriptions, etc. (avoid PII)
          },
        },
      });
    }

    const successBase = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:5173';
    const success_url = `${successBase}/payments/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${successBase}/payments/cancel`;

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url,
      cancel_url,
      allow_promotion_codes: true,
      customer_email: dto.customerEmail,
      metadata: {
        app: 'feronova',
        items: JSON.stringify(dto.lineItems),
      },
    });

    return {
      id: session.id,
      url: session.url,
    };
  }

  /**
   * Verify and parse Stripe webhook events using the raw body.
   */
  verifyWebhookSignature(rawBody: Buffer, signature: string) {
    const whSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET') ?? '';
    if (!whSecret) throw new Error('STRIPE_WEBHOOK_SECRET is not set');

    return this.stripe.webhooks.constructEvent(rawBody, signature, whSecret);
  }
}
