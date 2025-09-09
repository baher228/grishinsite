import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MigrationMode } from '../Enums/MigrationMode';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import DbConfig from '../../DAL/DbConfig';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class ApiConfigService {
  constructor(private readonly _configService: ConfigService) {}

  get dbConfig(): MikroOrmModuleOptions<PostgreSqlDriver> {
    return DbConfig;
  }

  get jwtAccessLifetime(): string {
    return this._configService.getOrThrow<string>('JWT_ACCESS_LIFETIME');
  }

  get jwtModuleConfig(): JwtModuleOptions {
    return {
      global: true,
      secret: this._configService.getOrThrow('JWT_SECRET'),
      signOptions: {
        expiresIn: this.jwtAccessLifetime,
      },
    };
  }

  get migrationMode(): MigrationMode {
    const env = Number(
      this._configService.getOrThrow<string>('MIGRATION_MODE'),
    );

    if (Number.isNaN(env)) {
      throw new Error('Environment "MIGRATION_MODE" should be number');
    }

    return env as unknown as MigrationMode;
  }
}
