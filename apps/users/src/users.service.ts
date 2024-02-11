import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userModel: typeof User){}
  
  getHello(): string {
    return 'Hello World from user service!';
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
