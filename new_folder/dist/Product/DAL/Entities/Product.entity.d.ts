import { BaseEntity } from '../../../DAL/Entities/BaseEntity';
export declare class Product extends BaseEntity {
    name: string;
    category: string;
    brand: string | null;
    description: string | null;
    image: string | null;
    price: number;
    stock: number;
}
