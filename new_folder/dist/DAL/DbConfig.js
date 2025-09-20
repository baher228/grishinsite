"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const migrations_1 = require("@mikro-orm/migrations");
const postgresql_1 = require("@mikro-orm/postgresql");
const reflection_1 = require("@mikro-orm/reflection");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const Product_entity_1 = require("../Product/DAL/Entities/Product.entity");
(0, dotenv_1.config)({ path: '.env' });
const poolConfig = process.env.POOL_MODE != null && process.env.POOL_MODE === 'ON'
    ? {
        min: Number(process.env.POOL_MIN_CONNECTIONS) || 2,
        max: Number(process.env.POOL_MAX_CONNECTIONS) || 10,
    }
    : undefined;
console.log('Pool config', poolConfig);
const DbConfig = (0, core_1.defineConfig)({
    driver: postgresql_1.PostgreSqlDriver,
    dbName: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    ensureDatabase: true,
    pool: poolConfig,
    entities: [Product_entity_1.Product],
    entitiesTs: [Product_entity_1.Product],
    migrations: {
        path: (0, path_1.join)(__dirname, 'Migrations'),
        pathTs: (0, path_1.join)(__dirname, 'Migrations'),
        transactional: true,
        allOrNothing: true,
        glob: '!(*.d).{js,ts}',
        emit: 'ts',
        disableForeignKeys: false,
        generator: migrations_1.TSMigrationGenerator,
        snapshotName: '.db-snapshot',
    },
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    loadStrategy: core_1.LoadStrategy.JOINED,
    flushMode: core_1.FlushMode.COMMIT,
    allowGlobalContext: false,
});
exports.default = DbConfig;
//# sourceMappingURL=DbConfig.js.map