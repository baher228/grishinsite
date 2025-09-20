import { Controller, Headers, HttpCode, Post, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import Stripe from 'stripe';

@Controller('payments')
export class WebhookController {
  constructor(private readonly payments: PaymentsService) {}

  /**
   * Stripe sends events here. This MUST be unauthenticated and must use the raw body.
   * main.ts was configured with { rawBody: true } so req.rawBody is available.
   */
  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
    // Guard: Stripe always sends this header; return 400 if missing
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
      case 'payment_intent.succeeded': {
        const intent = event.data.object as Stripe.PaymentIntent;
        // TODO: mark order as paid in your DB (lookup by intent.id or metadata)
        // Example:
        // await this.ordersService.markPaidByPaymentIntent(intent.id, intent.amount_received);
        break;
      }
      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent;
        // TODO: record failure reason intent.last_payment_error?.message
        break;
      }
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: mark order as paid by Checkout session.id / payment_intent
        // session.payment_intent may be a string; expand if you need details on your side
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
