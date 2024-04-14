import { PrismaService } from '@app/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../types';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService, 
    private jwtService: JwtService,
    private config: ConfigService
  ) {}


  /**
   * this is utility method to generate access and refresh token 
   * having userId and email in subject 
   * @param userId 
   * @param email 
   * @returns 
   */
    async getTokens(userId: number, email: string): Promise<Tokens> {
      const [at, rt] = await Promise.all([
        this.jwtService.signAsync({
          sub: userId,
          email,
        }, {
          secret: this.config.get('ACCESS_TOKEN_SECRET'),
          expiresIn: '15m'
        }),
  
        this.jwtService.signAsync({
          sub: userId,
          email,
        }, {
          secret: this.config.get('REFRESH_TOKEN_SECRET'),
          expiresIn: '1d'
        })
      ])
  
      return {
        access_token: at,
        refresh_token: rt
      }
    }
  
  

    /**
   * utility method to hash password
   * @param data 
   * @returns 
   */
    async hashData(data: string) {
      const salt = await bcrypt.genSalt();
      return bcrypt.hash(data, salt)
    }
}
