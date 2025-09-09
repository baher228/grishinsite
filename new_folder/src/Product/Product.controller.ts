import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../Infrastructure/DTO/Response/ApiResponse';
import { ApiBaseController } from '../Controllers/ApiBaseController';
import { ProductService } from './Product.service';

@ApiTags('product')
@Controller('product')
export class ProductController extends ApiBaseController {
  constructor(private readonly _articleService: ProductService) {
    super();
  }

  @Get()
  public async getAll(): Promise<ApiResponse<any>> {
    const articles = await this._articleService.getAll();
    return this.FormatResponse(articles);
  }

  @Post()
  public async create(@Body() request): Promise<ApiResponse<any>> {
    const article = await this._articleService.create(request);
    return this.FormatResponse(article);
  }
}
