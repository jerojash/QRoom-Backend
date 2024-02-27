import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    public username: string 
    
    @IsString()
    @MinLength(1)
    password: string
    
    @IsString()
    @MinLength(1)
    email: string
    
    @IsString()
    @MinLength(1)
    first_name: string
    
    @IsString()
    @MinLength(1)
    last_name: string

    @IsString()
    @IsOptional()
    code_area_1?: string
    
    @IsString()
    @IsOptional()
    phone_number_1?: string

}
