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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiBaseController_1 = require("../Controllers/ApiBaseController");
const Product_service_1 = require("./Product.service");
const Product_request_1 = require("./Infrastructure/DTO/Request/Product.request");
let ProductController = class ProductController extends ApiBaseController_1.ApiBaseController {
    productService;
    constructor(productService) {
        super();
        this.productService = productService;
    }
    async getAll() {
        const products = await this.productService.getAll();
        return this.FormatResponse(products);
    }
    async getCategory(category) {
        const products = await this.productService.getCategory(category);
        return this.FormatResponse(products);
    }
    async getProductById(id) {
        const product = await this.productService.getProductById(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return this.FormatResponse(product);
    }
    async createProduct(request) {
        const product = await this.productService.createProduct(request);
        return this.FormatResponse(product);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/category'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Product_request_1.CreateProductRequest]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [Product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=Product.controller.js.map