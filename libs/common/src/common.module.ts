import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'apps/auth/common/guards/at.guard';
import { AuthModule } from './auth/src/auth.module';

@Global()
@Module({
  providers: [
    CommonService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtGuard
    // }
  ],
  exports: [CommonService, PrismaModule, AuthModule],
  imports: [AuthModule, PrismaModule, 
    ConfigModule.forRoot({
      isGlobal: true // this help to use the service across other modules
    }),
  ],
})
export class CommonModule {}
