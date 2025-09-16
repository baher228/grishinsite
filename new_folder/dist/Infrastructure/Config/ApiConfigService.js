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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const DbConfig_1 = __importDefault(require("../../DAL/DbConfig"));
let ApiConfigService = class ApiConfigService {
    _configService;
    constructor(_configService) {
        this._configService = _configService;
    }
    get dbConfig() {
        return DbConfig_1.default;
    }
    get jwtAccessLifetime() {
        return this._configService.getOrThrow('JWT_ACCESS_LIFETIME');
    }
    get jwtModuleConfig() {
        return {
            global: true,
            secret: this._configService.getOrThrow('JWT_SECRET'),
            signOptions: {
                expiresIn: this.jwtAccessLifetime,
            },
        };
    }
    get migrationMode() {
        const env = Number(this._configService.getOrThrow('MIGRATION_MODE'));
        if (Number.isNaN(env)) {
            throw new Error('Environment "MIGRATION_MODE" should be number');
        }
        return env;
    }
};
exports.ApiConfigService = ApiConfigService;
exports.ApiConfigService = ApiConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ApiConfigService);
//# sourceMappingURL=ApiConfigService.js.map