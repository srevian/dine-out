import { JwtPayLoad } from "./jwtpayload.type"

export type JwtPayloadWithRt = JwtPayLoad & { refreshToken: string }