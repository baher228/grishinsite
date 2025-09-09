import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Product } from '../Entities/Product.entity';

@Injectable()
export class ProductRepository extends EntityRepository<Product> {}
