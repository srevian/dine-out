import { AuthGuard } from "@nestjs/passport";

export class RefreshJwtGuard extends AuthGuard('jwt-refresh-token') {
    constructor() {
        super()
    }
}