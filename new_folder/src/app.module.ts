import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductModule } from './Product/Product.module';
import { UploadsModule } from './uploads/uploads.module';
import DbConfig from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,}),
    MikroOrmModule.forRoot(DbConfig),
    ProductModule,
    UploadsModule,
    AuthModule,
    PaymentsModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
