import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from './DAL/Entities/Product.entity';
import { ProductService } from './Product.service';
import { ProductController } from './Product.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
