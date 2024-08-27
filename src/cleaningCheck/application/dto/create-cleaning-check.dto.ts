import { IsNumber, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateCleaningCheckDto {

    @IsString()
    @MinLength(1)
    public name: string 

    @IsOptional()
    @IsUUID()
    public type_id: string


    @IsNumber()
    public order: number 

    @IsOptional()
    @IsUUID()
    public id_parent_task?: string
}
