"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const Product_repository_1 = require("./DAL/Repositories/Product.repository");
const Product_entity_1 = require("./DAL/Entities/Product.entity");
const Product_response_1 = require("./Infrastructure/DTO/Response/Product.response");
let ProductService = class ProductService {
    _productRepository;
    _em;
    constructor(_productRepository, _em) {
        this._productRepository = _productRepository;
        this._em = _em;
    }
    async getAll() {
        return await this._productRepository.findAll();
    }
    async getCategory(category) {
        return await this._productRepository.find({ category: category }, { orderBy: { name: 'ASC' } });
    }
    async getProductById(id) {
        return await this._productRepository.find({ id: id }, { orderBy: { name: 'ASC' } });
    }
    async create(request) {
        const product = this._em.create(Product_entity_1.Product, request);
        await this._em.persistAndFlush(product);
        return new Product_response_1.ProductResponse(product);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Product_repository_1.ProductRepository,
        postgresql_1.EntityManager])
], ProductService);
//# sourceMappingURL=Product.service.js.map