import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'apps/auth/common/guards/at.guard';

@Global()
@Module({
  providers: [
    CommonService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ],
  exports: [CommonService, PrismaModule],
  imports: [PrismaModule, 
    ConfigModule.forRoot({
      isGlobal: true // this help to use the service across other modules
    }),
  ],
})
export class CommonModule {}
