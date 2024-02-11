import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = new DocumentBuilder()
    .setTitle('Auth Module')
    .setDescription('Authentication APIs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('auth', app, document);

  // use validation pipe to enable validation for auth module
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true //trim out unnecessary field to log other than defined in DTO
  }))
  await app.listen(3000);
}
bootstrap();
