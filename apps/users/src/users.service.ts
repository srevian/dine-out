import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto, UserSigninDto } from '../dto';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { AuthService } from '@app/common/auth/src';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Tokens } from '@app/common/auth/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService
  ) {}
  
  getHello(): string {
    return 'Hello World from user service!';
  }

  /**
   * 
   * @param dto 
   * @returns 
   */
  async signup(dto: UserDto) {
    //generate password hash
    const hash = await this.authService.hashData(dto.password);
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
      const tokens = await this.authService.getTokens(user.id, user.email)
      await this.updateRefreshToken(user.id, tokens.refresh_token)
      return { user, tokens }
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


  /**
   * 
   * @param dto 
   * @returns 
   */
  async signin(dto: UserSigninDto): Promise<Tokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        contactNo: dto.contactNo,
      }
    });
    if(!user)
      throw new NotFoundException('Contact No is not found')
    const pwdMatch = await bcrypt.compare(dto.password, user.password);
    if(!pwdMatch)
      throw new UnauthorizedException('Invalid password')
    const tokens = await this.authService.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refresh_token)
    return tokens
  }


  /**
   * 
   * @param userId 
   */
  async logout(userId: number) {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null
        },
      },
      data: {
        refreshToken: null
      }
    })
  }


  /**
   * get user request rt token and check if same with 
   * @param userId 
   * @param token 
   */
  async refreshToken(userId: number, authHeader: string) {
    const token = authHeader?.replace('Bearer', '').trim()
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })
    if(!user)
      throw new ForbiddenException('Access Denied')

    const rtMatches = await bcrypt.compare(token, user.refreshToken);
    if (!rtMatches) 
      throw new ForbiddenException('Access Denied');
  
    const tokens = await this.authService.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refresh_token)
    return {
      id: userId, 
      refreshToken: tokens.refresh_token 
    }
  }

  /**
   * 
   * @param userId 
   * @param token 
   */
  async updateRefreshToken(userId: number, token: string) {
    await this.prismaService.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken: await this.authService.hashData(token)
      }
    })
  }
}
