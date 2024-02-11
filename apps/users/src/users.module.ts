import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { CommonModule } from '@app/common';
import { AuthModule } from './auth/auth.module';

// @Module({
//   imports: [SequelizeModule.forRoot({
//     dialect: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: 'password',
//     database: 'test-db',
//     models: [User],
//   }),
// ],
//   controllers: [UsersController],
//   providers: [UsersService],
// })
@Module({
  imports: [CommonModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
