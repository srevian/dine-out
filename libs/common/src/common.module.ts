import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [CommonService],
  exports: [CommonService, PrismaModule],
  imports: [PrismaModule, 
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
})
export class CommonModule {}
