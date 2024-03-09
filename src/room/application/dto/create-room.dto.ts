import { IsString, MinLength } from "class-validator";

export class CreateRoomDto {

    @IsString()
    @MinLength(1)
    public area: string 

    @IsString()
    @MinLength(1)
    public name: string 
}
