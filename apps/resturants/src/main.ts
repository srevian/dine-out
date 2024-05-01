import { NestFactory } from '@nestjs/core';
import { ResturantsModule } from './resturants.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ResturantsModule);
  const config = new DocumentBuilder()
    .setTitle('Resturants Module')
    .setDescription('Resturants APIs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Resturants', app, document);
  app.useGlobalPipes(new ValidationPipe({
    // if it is enabled then without class validator on any dto field is not considered and come as undefined even the value is passed in body
    // whitelist: true //trim out unnecessary field to log or consider to take them other than defined in DTO
  }))
  await app.listen(3003);
}
bootstrap();
