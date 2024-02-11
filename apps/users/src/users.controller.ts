import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
// import { CreateUserDto } from '../dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }

  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<User> {
  //   return this.usersService.findOne(id);
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto): Promise<[number]> {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number): Promise<void> {
  //   return this.usersService.remove(id);
  // }
}
