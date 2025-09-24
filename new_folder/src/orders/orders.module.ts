import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './DAL/Entities/order.entity';
import { OrderItem } from './DAL/Entities/order-item.entity';
import { ProductModule } from '../Product/Product.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Order, OrderItem]),
    ProductModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService], // Exporting so other modules like PaymentsModule can use it
})
export class OrdersModule {}
