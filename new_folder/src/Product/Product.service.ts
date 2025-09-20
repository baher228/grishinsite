import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from './DAL/Repositories/Product.repository';
import { Product } from './DAL/Entities/Product.entity';
import { ProductResponse } from './Infrastructure/DTO/Response/Product.response';

@Injectable()
export class ProductService {
  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly _em: EntityManager,
  ) {}

  public async getAll() {
    return await this._productRepository.findAll();
  }

  public async getCategory(category: string): Promise<ProductResponse[]> {
    const list = await this._productRepository.find(
      { category },
      { orderBy: { name: 'ASC' } },
    );
    return list.map((p) => new ProductResponse(p));
  }

  public async getProductById(id: number): Promise<ProductResponse | null> {
    const product = await this._productRepository.findOne({ id });
    return product ? new ProductResponse(product) : null;
  }

  public async create(request: any): Promise<ProductResponse> {
    const product = this._em.create(Product, request);

    await this._em.persistAndFlush(product);
    return new ProductResponse(product);
  }
}
