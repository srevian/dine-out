import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto';
import { SigninDto } from '../dto/siginin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('signup')
  signup(@Body() dto: AuthDto){
    return this.authService.signup(dto)
  }

  @Post('signin')
  signin(@Body() dto: SigninDto){
    return this.authService.signin(dto)
  }
}
