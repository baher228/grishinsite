import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../Infrastructure/DTO/Response/ApiResponse';
import { ApiBaseController } from '../Controllers/ApiBaseController';
import { ProductService } from './Product.service';

@ApiTags('product')
@Controller('product')
export class ProductController extends ApiBaseController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Get('/all')
  public async getAll(): Promise<ApiResponse<any>> {
    const products = await this.productService.getAll();
    return this.FormatResponse(products);
  }

  @Get('/category')
  public async getCategory(@Body() category: string) {
    return this.productService.getCategory(category);
  }

  @Get(':id')
  public async getProductById(@Body() id: number){
    return this.productService.getProductById(id)
  }

  @Post()
  public async create(@Body() request): Promise<ApiResponse<any>> {
    const product = await this.productService.create(request);
    return this.FormatResponse(product);
  }
}
