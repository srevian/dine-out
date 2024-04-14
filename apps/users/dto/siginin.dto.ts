import { IsNotEmpty, IsNumberString, IsString } from "class-validator"

export class UserSigninDto {
    @IsNumberString()
    @IsNotEmpty()
    contactNo: string

    @IsString()
    @IsNotEmpty()
    password: string
}