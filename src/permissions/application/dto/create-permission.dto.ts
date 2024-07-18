import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreatePermissionDto {

    @IsString()
    @IsUUID()
    @MinLength(1)
    public id_rol: string 

    @IsString()
    @IsUUID()
    @IsOptional()
    public id_room: string 

    @IsString()
    @IsUUID()
    @IsOptional()
    public id_cleaning_type: string 
}
