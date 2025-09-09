import {
  defineConfig,
  FlushMode,
  LoadStrategy,
  PoolConfig,
} from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: '.env' });

const poolConfig: PoolConfig | undefined =
  process.env.POOL_MODE != null && process.env.POOL_MODE === 'ON'
    ? {
        min: Number(process.env.POOL_MIN_CONNECTIONS) || 2,
        max: Number(process.env.POOL_MAX_CONNECTIONS) || 10,
      }
    : undefined;

console.log('Pool config', poolConfig);

const DbConfig: MikroOrmModuleOptions<PostgreSqlDriver> = defineConfig({
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME || 'market-place',
  user: process.env.DB_USERNAME || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || 'password',
  ensureDatabase: false,
  pool: poolConfig,
  entities: [],
  entitiesTs: [],
  migrations: {
    path: join(__dirname, 'Migrations'),
    pathTs: join(__dirname, 'Migrations'),
    transactional: true,
    allOrNothing: true,
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    disableForeignKeys: false,
    generator: TSMigrationGenerator,
    snapshotName: '.db-snapshot',
  },
  metadataProvider: TsMorphMetadataProvider,
  loadStrategy: LoadStrategy.JOINED,
  flushMode: FlushMode.COMMIT,
  allowGlobalContext: false,
});

export default DbConfig;
