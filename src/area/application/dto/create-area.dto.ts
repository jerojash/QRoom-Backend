import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateAreaDto {

    @IsString()
    @MinLength(1)
    public name: string 

    @IsNumber()
    public order: number 
}