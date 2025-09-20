import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './DTO/create-payment-intent.dto';
import { CreateCheckoutSessionDto } from './DTO/create-checkout-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('intents')
  async createIntent(@Body() dto: CreatePaymentIntentDto) {
    return this.payments.createPaymentIntent(dto);
  }

  @Post('checkout')
  async createCheckout(@Body() dto: CreateCheckoutSessionDto) {
    return this.payments.createCheckoutSession(dto);
  }
}
