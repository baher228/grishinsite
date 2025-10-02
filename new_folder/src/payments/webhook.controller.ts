import { Controller, Headers, HttpCode, Post, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { OrdersService } from '../orders/orders.service';
import Stripe from 'stripe';

@Controller('payments')
export class WebhookController {
  constructor(
    private readonly payments: PaymentsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: any,
    @Headers('stripe-signature') signature: string,
  ) {
    if (!signature) {
      return;
    }

    let event: Stripe.Event;
    try {
      event = this.payments.verifyWebhookSignature(req.rawBody, signature);
    } catch (err) {
      // Signature verification failed
      return;
    }

    // Handle relevant events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        // This is the crucial step: create an order record from the successful payment.
        await this.ordersService.createOrderFromStripeSession(session);
        break;
      }

      default:
        // Other events if you need them
        break;
    }
    // Always 200 OK if the event was accepted
    return;
  }
}
