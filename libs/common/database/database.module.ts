import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'apps/users/src/users.model';
import { DatabaseConfigService } from './database-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
        useFactory: (configService: DatabaseConfigService) => ({
            dialect: configService.get('dialect'),
            host: configService.get('host'),
            port: configService.get('port'),
            username: configService.get('username'),
            password: configService.get('password'),
            database: configService.get('database'),
            autoLoadModels: configService.get('autoLoadModels'),
            synchronize: configService.get('synchronize'),
            models: [User],
        }),
        inject: [DatabaseConfigService],
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService, SequelizeModule],
})
export class DatabaseModule{}