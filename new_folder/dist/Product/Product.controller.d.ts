import { ApiResponse } from '../Infrastructure/DTO/Response/ApiResponse';
import { ApiResponse as ApiResponseDto } from '../Infrastructure/DTO/Response/ApiResponse';
import { ProductResponse } from './Infrastructure/DTO/Response/Product.response';
import { ApiBaseController } from '../Controllers/ApiBaseController';
import { ProductService } from './Product.service';
import { CreateProductRequest } from './Infrastructure/DTO/Request/Product.request';
import { Product } from './DAL/Entities/Product.entity';
export declare class ProductController extends ApiBaseController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(): Promise<ApiResponse<Product[]>>;
    getCategory(category: 'Bath & Plumbing' | 'Landscaping' | 'Storage & Shelving' | 'Lighting' | 'Doors & Security' | 'Screws & Fixings'): Promise<ApiResponseDto<any>>;
    getProductById(id: number): Promise<ApiResponseDto<ProductResponse>>;
    createProduct(request: CreateProductRequest): Promise<ApiResponse<any>>;
}
