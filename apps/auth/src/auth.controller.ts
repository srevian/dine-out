import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto';
import { SigninDto } from '../dto/siginin.dto';
import { Tokens } from '../types';
import { JwtGuard, RefreshJwtGuard } from '../common/guards';
import { GetCurrentUser, SkipAuth } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @SkipAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto)
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signin(@Body() dto: SigninDto):Promise<Tokens> {
    return this.authService.signin(dto)
  }


  // keep authguard strategy name as same as our defined strategy name
  // @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@GetCurrentUser('sub') userId: number) {
    return this.authService.logout(userId)
  }

  // keep authguard strategy name as same as our defined strategy name
  @SkipAuth()
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUser('sub') userId: number,
    @Headers('Authorization') authHeader: string
  ) {
    return this.authService.refreshToken(userId, authHeader)
  }
}
