import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator"

export class AuthDto {
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsNumberString()
    @IsNotEmpty()
    contactNo: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsString()
    lastName: string
}