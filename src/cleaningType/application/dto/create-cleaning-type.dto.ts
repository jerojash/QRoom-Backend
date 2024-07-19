import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateCleaningTypeDto {

    @IsString()
    @MinLength(1)
    public name: string 


    @IsUUID()
    @MinLength(1)
    @IsOptional()
    public id_room: string 

}
