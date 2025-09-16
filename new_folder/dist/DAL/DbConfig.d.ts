import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
declare const DbConfig: MikroOrmModuleOptions<PostgreSqlDriver>;
export default DbConfig;
