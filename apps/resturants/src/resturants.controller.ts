import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ResturantsService } from './resturants.service';
import { ResturantDto } from '../dto';

@Controller('resturants')
export class ResturantsController {
  constructor(private readonly resturantsService: ResturantsService) {}

  @Get()
  getHello(): string {
    return this.resturantsService.getHello();
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async addResturant(@Body() dto: ResturantDto) {
    return this.resturantsService.addResturant(dto)
  }

  @Get('get')
  @HttpCode(HttpStatus.OK)
  async getAllResturant(): Promise<ResturantDto[]> {
    return await this.resturantsService.getAllResturant()
  }

  @Get('get/name/:name')
  @HttpCode(HttpStatus.OK)
  async getResturant(@Param('name') name: string): Promise<ResturantDto[]> {
    return await this.resturantsService.getResturant(name)
  }

  @Get('get/address/:address')
  @HttpCode(HttpStatus.OK)
  async getResturantFromAddress(@Param('address') address: string): Promise<ResturantDto[]> {
    return await this.resturantsService.getResturantFromAddress(address)
  }
}
