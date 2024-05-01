import { PrismaMongoDbService } from '@app/common/prisma/prisma-mongo.service';
import { Injectable } from '@nestjs/common';
import { ResturantDto } from '../dto';

@Injectable()
export class ResturantsService {
  constructor(private readonly prismaService: PrismaMongoDbService) {}

  getHello(): string {
    return 'Hello World from resturants service!';
  }

  async addResturant(dto: ResturantDto) {
    const result = await this.prismaService.resturant.create({
      // data is same as DB fields to be inserted
      data: {
        Name: dto.Name,
        Address: dto.Address,
        Ratings: dto.Ratings,
        Reviews: dto.Reviews.split(','),
      },
      // select for returning user after post call which all field should come in response body
      select: {
        Name: true
      }
    });
  }

  async getAllResturant(): Promise<any>{
    return await this.prismaService.resturant.findMany();
  }

  async getResturant(name: string): Promise<any>{
    return await this.prismaService.resturant.findRaw({
      filter: { Name: { $regex: name, $options: 'i' } } // case-insensitive regex search
    });
  }

  async getResturantFromAddress(address: string): Promise<any>{
    return await this.prismaService.resturant.findRaw({
       filter: { Address: { $regex: address, $options: 'i' } } // case-insensitive regex search
    });
  }
}
