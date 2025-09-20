import { IsArray, IsEmail, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CartItemDto {
  @IsString()
  productId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreatePaymentIntentDto {
  @IsArray()
  lineItems!: CartItemDto[];

  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  currency?: string;
}
