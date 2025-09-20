import { ApiResponse } from '../Infrastructure/DTO/Response/ApiResponse';
import { ApiResponse as ApiResponseDto } from '../Infrastructure/DTO/Response/ApiResponse';
import { ProductResponse } from './Infrastructure/DTO/Response/Product.response';
import { ApiBaseController } from '../Controllers/ApiBaseController';
import { ProductService } from './Product.service';
export declare class ProductController extends ApiBaseController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(): Promise<ApiResponse<any>>;
    getCategory(category: string): Promise<ApiResponseDto<any>>;
    getProductById(id: number): Promise<ApiResponseDto<ProductResponse>>;
    create(request: any): Promise<ApiResponse<any>>;
}
