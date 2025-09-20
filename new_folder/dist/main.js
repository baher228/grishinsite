"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
        rawBody: true
    });
    app.setGlobalPrefix('api');
    app.enableShutdownHooks();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'public'), {
        prefix: '/public',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Market place')
        .setDescription('Market place API description')
        .setVersion('1.0')
        .addTag('market')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    app.enableCors();
    await app.listen(process.env.PORT ?? 4200);
}
void bootstrap();
//# sourceMappingURL=main.js.map