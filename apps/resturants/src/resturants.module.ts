import { Module } from '@nestjs/common';
import { ResturantsController } from './resturants.controller';
import { ResturantsService } from './resturants.service';

@Module({
  imports: [],
  controllers: [ResturantsController],
  providers: [ResturantsService],
})
export class ResturantsModule {}
