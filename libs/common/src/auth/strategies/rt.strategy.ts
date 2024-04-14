import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtPayLoad } from "../types";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor (private readonly config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
            passReqToCallBack: true,
        })
    }

    validate(payload: JwtPayLoad) {
        return { sub: payload.sub, email: payload.email };
    }
}