import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }
}
