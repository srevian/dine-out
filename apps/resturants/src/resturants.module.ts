import { Module } from '@nestjs/common';
import { ResturantsController } from './resturants.controller';
import { ResturantsService } from './resturants.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule],
  controllers: [ResturantsController],
  providers: [ResturantsService],
})
export class ResturantsModule {}
