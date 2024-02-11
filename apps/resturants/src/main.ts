import { NestFactory } from '@nestjs/core';
import { ResturantsModule } from './resturants.module';

async function bootstrap() {
  const app = await NestFactory.create(ResturantsModule);
  await app.listen(3000);
}
bootstrap();
