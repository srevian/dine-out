import { Controller, Get } from '@nestjs/common';
import { ResturantsService } from './resturants.service';

@Controller()
export class ResturantsController {
  constructor(private readonly resturantsService: ResturantsService) {}

  @Get()
  getHello(): string {
    return this.resturantsService.getHello();
  }
}
