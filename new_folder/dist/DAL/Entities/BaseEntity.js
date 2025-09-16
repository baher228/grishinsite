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
exports.BaseEntity = exports.BaseEntityTableColumnNames = void 0;
const core_1 = require("@mikro-orm/core");
const swagger_1 = require("@nestjs/swagger");
var BaseEntityTableColumnNames;
(function (BaseEntityTableColumnNames) {
    BaseEntityTableColumnNames["id"] = "id";
    BaseEntityTableColumnNames["createdAt"] = "created_at";
    BaseEntityTableColumnNames["updatedAt"] = "updated_at";
})(BaseEntityTableColumnNames || (exports.BaseEntityTableColumnNames = BaseEntityTableColumnNames = {}));
class BaseEntity {
    id;
    createdAt;
    updatedAt;
}
exports.BaseEntity = BaseEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, core_1.PrimaryKey)({ autoincrement: true, fieldName: BaseEntityTableColumnNames.id }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, core_1.Property)({
        defaultRaw: 'now()',
        type: 'timestamptz',
        fieldName: BaseEntityTableColumnNames.createdAt,
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, core_1.Property)({
        onUpdate: (entity) => (entity.updatedAt = new Date()),
        defaultRaw: 'now()',
        type: 'timestamptz',
        fieldName: BaseEntityTableColumnNames.updatedAt,
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=BaseEntity.js.map