import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Connection and Configuration for Swagger
  const swagger = new DocumentBuilder()
    .setTitle('Config for RestAPI')
    .setDescription('Test Task for Nest.js')
    .setVersion('1.0')
    .addTag('RestAPI')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(3000);
}
bootstrap();
