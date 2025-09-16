import { ConfigService } from '@nestjs/config';
import { MigrationMode } from '../Enums/MigrationMode';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { JwtModuleOptions } from '@nestjs/jwt';
export declare class ApiConfigService {
    private readonly _configService;
    constructor(_configService: ConfigService);
    get dbConfig(): MikroOrmModuleOptions<PostgreSqlDriver>;
    get jwtAccessLifetime(): string;
    get jwtModuleConfig(): JwtModuleOptions;
    get migrationMode(): MigrationMode;
}
