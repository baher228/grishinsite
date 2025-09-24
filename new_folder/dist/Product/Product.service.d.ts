import { EntityManager } from '@mikro-orm/postgresql';
import { ProductRepository } from './DAL/Repositories/Product.repository';
import { Product } from './DAL/Entities/Product.entity';
import { ProductResponse } from './Infrastructure/DTO/Response/Product.response';
import { CreateProductRequest } from './Infrastructure/DTO/Request/Product.request';
export declare class ProductService {
    private readonly _productRepository;
    private readonly _em;
    constructor(_productRepository: ProductRepository, _em: EntityManager);
    getAll(): Promise<import("@mikro-orm/postgresql").Loaded<Product, never, "*", never>[]>;
    getCategory(category: "Bath & Plumbing" | "Landscaping" | "Storage & Shelving" | "Lighting" | "Doors & Security" | "Screws & Fixings"): Promise<ProductResponse[]>;
    getProductById(id: number): Promise<ProductResponse | null>;
    createProduct(request: CreateProductRequest): Promise<ProductResponse>;
    updateProduct(request: any): Promise<void>;
}
