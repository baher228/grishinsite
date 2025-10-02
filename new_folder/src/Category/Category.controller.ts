import { Controller } from '@nestjs/common';
import { CategoryService } from './Category';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
}
