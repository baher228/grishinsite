import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MigrationMode } from './Infrastructure/Enums/MigrationMode';
import { ApiConfigService } from './Infrastructure/Config/ApiConfigService';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.enableShutdownHooks();

  const configService = app.get(ApiConfigService);

  if (configService.migrationMode === MigrationMode.ON) {
    console.log('RUN MIGRATIONS');

    try {
      const orm = app.get(MikroORM);
      const migrator = orm.getMigrator();
      await migrator.up();
    } catch (e) {
      console.log('ERROR DURING MIGRATION');
      console.log(e);

      throw e;
    }
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Market place')
    .setDescription('Market place API description')
    .setVersion('1.0')
    .addTag('market')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
