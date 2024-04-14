import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const config = new DocumentBuilder()
    .setTitle('User Module')
    .setDescription('User APIs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('user', app, document);

  // use validation pipe to enable validation for auth module
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true //trim out unnecessary field to log or consider to take them other than defined in DTO
  }))
  await app.listen(3001);
}
bootstrap();
