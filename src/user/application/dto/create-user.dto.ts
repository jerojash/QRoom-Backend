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

    constructor(username: string, password: string, email: string, first_name: string,
        last_name: string, code_area_1?: string, phone_number_1?: string){
            this.username = username;
            this.password = password;
            this.email = email;
            this.first_name = first_name;
            this.last_name = last_name;
            this.phone_number_1 = phone_number_1;
            this.code_area_1 = code_area_1;

    }
}
