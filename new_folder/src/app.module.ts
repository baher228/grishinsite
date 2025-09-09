import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApiConfigService } from './Infrastructure/Config/ApiConfigService';
import { ApiConfigModule } from './Infrastructure/Config/ApiConfigModule';

const driverOptions =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local'
    ? {}
    : {
        connection: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
            ca: process.env.DATABASE_CA,
          },
        },
      };

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => {
        return {
          ...configService.dbConfig,
          // scope: Scope.REQUEST, // TODO: Uncomment this when we have a request context
          // registerRequestContext: true,
          // strict: true,
          // validate: true,
          driverOptions,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
