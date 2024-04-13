import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from '../strategies';

@Module({
  imports: [
    CommonModule, 
    JwtModule.register({
      global: true,
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
  })
],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
