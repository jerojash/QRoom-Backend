import { IsString, MinLength } from "class-validator";

export class CreateRolDto {

    @IsString()
    @MinLength(1)
    public name: string 

}
