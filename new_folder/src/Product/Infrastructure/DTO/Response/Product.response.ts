import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '../../../DAL/Entities/Product.entity';

export class ProductResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiPropertyOptional({ nullable: true })
  brand: string | null;

  @ApiPropertyOptional({ nullable: true })
  description: string | null;

  @ApiPropertyOptional({ nullable: true })
  image: string | null;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  constructor(entity: Product) {
    this.id = entity.id;
    this.name = entity.name;
    this.category = entity.category;
    this.price = entity.price;
    this.stock = entity.stock;
    this.brand = entity.brand ?? null;
    this.description = entity.description ?? null;
    this.image = entity.image ?? null;
  }
}
