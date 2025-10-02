import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../Infrastructure/DTO/Response/ApiResponse';
import { ApiResponse as ApiResponseDto } from '../Infrastructure/DTO/Response/ApiResponse';
import { ProductResponse } from './Infrastructure/DTO/Response/Product.response';
import { ApiBaseController } from '../Controllers/ApiBaseController';
import { ProductService } from './Product.service';
import { CreateProductRequest } from './Infrastructure/DTO/Request/Product.request';
import { Product } from './DAL/Entities/Product.entity';

@ApiTags('product')
@Controller('product')
export class ProductController extends ApiBaseController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Get('/all')
  public async getAll(): Promise<ApiResponse<Product[]>> {
    const products = await this.productService.getAll();
    return this.FormatResponse(products);
  }

  @Get('/category')
  public async getCategory(
    @Query('category')
    category:
      | 'Bath & Plumbing'
      | 'Landscaping'
      | 'Storage & Shelving'
      | 'Lighting'
      | 'Doors & Security'
      | 'Screws & Fixings',
  ): Promise<ApiResponseDto<any>> {
    const products = await this.productService.getCategory(category);
    return this.FormatResponse(products);
  }

  @Get(':id')
  public async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseDto<ProductResponse>> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.FormatResponse(product);
  }

  @Post()
  public async createProduct(
    @Body() request: CreateProductRequest,
  ): Promise<ApiResponse<any>> {
    const product = await this.productService.createProduct(request);
    return this.FormatResponse(product);
  }
}
