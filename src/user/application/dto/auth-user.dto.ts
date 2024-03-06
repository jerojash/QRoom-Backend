import { IsString, MinLength } from "class-validator"

export class AuthUserDto {
    @IsString()
    @MinLength(1)
    password: string
    
    @IsString()
    @MinLength(1)
    email: string
}