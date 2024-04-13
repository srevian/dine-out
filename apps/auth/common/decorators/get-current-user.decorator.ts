import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayloadWithRt } from "apps/auth/types/jwtpayloadwithrt";

// custom decorator which will eliminate @Req() Request in controller
export const GetCurrentUser = createParamDecorator(
    (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        const user = request.user
        return data ? user?.[data] : user
    }
)