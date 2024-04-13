import { IsNotEmpty, IsNumberString, IsString } from "class-validator"

export class SigninDto {
    @IsNumberString()
    @IsNotEmpty()
    contactNo: string

    @IsString()
    @IsNotEmpty()
    password: string
}