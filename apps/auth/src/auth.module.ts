import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CommonModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
