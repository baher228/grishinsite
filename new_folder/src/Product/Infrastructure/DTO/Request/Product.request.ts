import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category!:
    | 'Bath & Plumbing'
    | 'Landscaping'
    | 'Storage & Shelving'
    | 'Lighting'
    | 'Doors & Security'
    | 'Screws & Fixings';

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stock!: number;
}
