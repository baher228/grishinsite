import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateCheckoutSessionDto } from './DTO/create-checkout-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('checkout')
  async createCheckout(@Body() dto: CreateCheckoutSessionDto) {
    return this.payments.createCheckoutSession(dto);
  }
}
