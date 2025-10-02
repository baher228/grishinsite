import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { WebhookController } from './webhook.controller';
import { ProductModule } from '../Product/Product.module'; // adapt import name if different
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [ConfigModule, ProductModule, OrdersModule],
  controllers: [PaymentsController, WebhookController],

  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
