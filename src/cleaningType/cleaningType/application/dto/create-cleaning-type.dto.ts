import { IsString, MinLength } from "class-validator";

export class CreateCleaningTypeDto {

    @IsString()
    @MinLength(1)
    public name: string 

    @IsString()
    @MinLength(1)
    public description: string 

}
