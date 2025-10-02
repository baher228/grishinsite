import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApiConfigModule } from './Infrastructure/Config/ApiConfigModule';
import { ApiConfigService } from './Infrastructure/Config/ApiConfigService';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductModule } from './Product/Product.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => {
        return {
          ...configService.dbConfig,
          // scope: Scope.REQUEST, //TODO: figure this out
          // registerRequestContext: true,
          // strict: true,
          // validate: true,
        };
      },
    }),
    ProductModule,
    UploadsModule,
    AuthModule,
    PaymentsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
