import { ApiResponse } from '../Infrastructure/DTO/Response/ApiResponse';
import { ApiBaseController } from '../Controllers/ApiBaseController';
import { ProductService } from './Product.service';
export declare class ProductController extends ApiBaseController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(): Promise<ApiResponse<any>>;
    getCategory(category: string): Promise<import("@mikro-orm/core").Loaded<import("./DAL/Entities/Product.entity").Product, never, "*", never>[]>;
    getProductById(id: number): Promise<import("@mikro-orm/core").Loaded<import("./DAL/Entities/Product.entity").Product, never, "*", never>[]>;
    create(request: any): Promise<ApiResponse<any>>;
}
