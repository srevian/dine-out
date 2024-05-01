import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaMongoDbService } from './prisma-mongo.service';

@Module({
  providers: [PrismaService, PrismaMongoDbService],
  exports: [PrismaService, PrismaMongoDbService],
})
export class PrismaModule {}
