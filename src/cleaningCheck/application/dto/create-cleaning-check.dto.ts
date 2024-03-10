import { IsString, IsUUID, MinLength } from "class-validator";

export class CreateCleaningCheckDto {

    @IsString()
    @MinLength(1)
    public name: string 

    @IsString()
    @MinLength(1)
    public description: string 


    @IsString()
    @MinLength(1)
    @IsUUID()
    public type_id: string

}
