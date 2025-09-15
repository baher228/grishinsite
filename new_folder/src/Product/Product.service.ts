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

  public async getCategory(category: string) {
    return await this._productRepository.find(
      { category: category },
      { orderBy: { name: 'ASC' } },
    );
  }

  public async getProductById(id: number) {
    return await this._productRepository.find(
      { id: id },
      { orderBy: { name: 'ASC' } },
    );
  }

  public async create(request: any): Promise<ProductResponse> {
    const product = this._em.create(Product, request);

    await this._em.persistAndFlush(product);
    return new ProductResponse(
      product.id,
      product.name,
      product.description,
      product.price,
      product.stock,
      product.category,
    );
  }
}
