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
    const products = await this._productRepository.findAll();
    return products;
  }

  public async create(request: any): Promise<ProductResponse> {
    const product = new Product(
      request.name,
      request.description,
      request.price,
    );

    await this._em.persistAndFlush(product);
    return new ProductResponse(
      product.id,
      product.name,
      product.description,
      product.price,
    );
  }
}
