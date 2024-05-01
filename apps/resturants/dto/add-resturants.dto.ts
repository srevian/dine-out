import { IsNotEmpty, IsString } from "class-validator"

export class ResturantDto {
    @IsString()
    @IsNotEmpty()
    Name: string

    @IsString()
    @IsNotEmpty()
    Address: string

    Ratings: string
    Reviews: string
}