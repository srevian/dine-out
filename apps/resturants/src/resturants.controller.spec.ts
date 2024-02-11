import { Test, TestingModule } from '@nestjs/testing';
import { ResturantsController } from './resturants.controller';
import { ResturantsService } from './resturants.service';

describe('ResturantsController', () => {
  let resturantsController: ResturantsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ResturantsController],
      providers: [ResturantsService],
    }).compile();

    resturantsController = app.get<ResturantsController>(ResturantsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(resturantsController.getHello()).toBe('Hello World!');
    });
  });
});
