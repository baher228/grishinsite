import { IsArray, IsEmail, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CheckoutItemDto {
  @IsString()
  productId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateCheckoutSessionDto {
  @IsArray()
  lineItems!: CheckoutItemDto[];

  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  currency?: string;
}
