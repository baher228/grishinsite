import { Product } from '../../../DAL/Entities/Product.entity';
export declare class ProductResponse {
    id: number;
    name: string;
    category: string;
    brand: string | null;
    description: string | null;
    image: string | null;
    price: number;
    stock: number;
    constructor(entity: Product);
}
