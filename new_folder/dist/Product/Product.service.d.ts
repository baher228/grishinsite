import { EntityManager } from '@mikro-orm/postgresql';
import { ProductRepository } from './DAL/Repositories/Product.repository';
import { Product } from './DAL/Entities/Product.entity';
import { ProductResponse } from './Infrastructure/DTO/Response/Product.response';
export declare class ProductService {
    private readonly _productRepository;
    private readonly _em;
    constructor(_productRepository: ProductRepository, _em: EntityManager);
    getAll(): Promise<import("@mikro-orm/postgresql").Loaded<Product, never, "*", never>[]>;
    getCategory(category: string): Promise<ProductResponse[]>;
    getProductById(id: number): Promise<ProductResponse | null>;
    create(request: any): Promise<ProductResponse>;
}
