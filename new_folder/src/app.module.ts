import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductModule } from './Product/Product.module';
import DbConfig from './mikro-orm.config';


@Module({
  imports: [
    MikroOrmModule.forRoot(DbConfig),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
