import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser, SkipAuth } from '@app/common/auth/decorators';
import { UserDto, UserSigninDto } from '../dto';
import { JwtGuard, RefreshJwtGuard } from '@app/common/auth/guards';
import { Tokens } from '@app/common/auth/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }

  // @SkipAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() dto: UserDto) {
    return this.usersService.signup(dto)
  }


  // @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signin(@Body() dto: UserSigninDto):Promise<Tokens> {
    return this.usersService.signin(dto)
  }


  // keep authguard strategy name as same as our defined strategy name
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@GetCurrentUser('sub') userId: number) {
    return this.usersService.logout(userId)
  }

  // keep authguard strategy name as same as our defined strategy name
  // @SkipAuth()
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUser('sub') userId: number,
    @Headers('Authorization') authHeader: string
  ) {
    return this.usersService.refreshToken(userId, authHeader)
  }

  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<User> {
  //   return this.usersService.findOne(id);
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
