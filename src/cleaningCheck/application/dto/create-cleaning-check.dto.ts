import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateCleaningCheckDto {

    @IsString()
    @MinLength(1)
    public name: string 

    @IsOptional()
    @IsUUID()
    public type_id: string

    @IsOptional()
    @IsUUID()
    public id_parent_task?: string
}
