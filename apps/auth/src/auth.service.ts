import { PrismaService } from '@app/common/prisma/prisma.service';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '../dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SigninDto } from '../dto/siginin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService, 
    private jwtService: JwtService
  ) {}
  
  getHello(): string {
    return 'Hello World from auth app!';
  }

  async signup(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    try{
      //save the user in db
      const user = await this.prismaService.user.create({
        // data is same as DB fields to be inserted
        data: {
          email: dto.email,
          password: hash,
          contactNo: dto.contactNo,
          firstName: dto.firstName,
          lastName: dto.lastName
        },
        // select for returning user after post call which all field should come in response body
        select: {
          id: true,
          email: true,
          contactNo: true,
          firstName: true,
          lastName: true
        }
      });
      return user
    } catch(error){
      if (error instanceof PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists')
        }
      }
      throw new BadRequestException(error)
    }
  }

  async signin(dto: SigninDto){
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      }
    });
    if(!user)
      throw new NotFoundException('Invalid email')
    const pwdMatch = await argon.verify(user.password, dto.password);
    if(!pwdMatch)
      throw new UnauthorizedException('Invalid password')
    return "login successful"
  }

  async signToken(userId: number, email: string){
  
  }
}
