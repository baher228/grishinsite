import { Module } from '@nestjs/common';
import { CategoryService } from './Category';
import { CategoryController } from './Category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
