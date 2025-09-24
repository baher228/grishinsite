import { BaseEntity } from '../../../DAL/Entities/BaseEntity';
export declare class Product extends BaseEntity<'description' | 'image'> {
    name: string;
    category: "Bath & Plumbing" | "Landscaping" | "Storage & Shelving" | "Lighting" | "Doors & Security" | "Screws & Fixings";
    brand: string | null;
    description: string | null;
    image: string | null;
    price: number;
    stock: number;
}
