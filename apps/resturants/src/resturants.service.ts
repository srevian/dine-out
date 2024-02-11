import { Injectable } from '@nestjs/common';

@Injectable()
export class ResturantsService {
  getHello(): string {
    return 'Hello World from resturants service!';
  }
}
