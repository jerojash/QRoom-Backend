import { IsString, MinLength, IsUUID, IsOptional, IsDate } from "class-validator"

export class CreateCleaningActionDto {
    @IsString()
    @MinLength(1)
    @IsOptional()
    @IsUUID()
    public id_room?: string 

    @IsString()
    @MinLength(1)
    @IsOptional()
    public user_rol?: string 

    @IsString()
    @MinLength(1)
    @IsUUID()
    @IsOptional()
    public id_user?: string

    @IsString()
    @MinLength(1)
    @IsUUID()
    @IsOptional()
    public id_cleaning_type?: string

    @IsString()
    @MinLength(1)
    @IsOptional()
    @IsDate()
    public time?: string

    @IsString()
    @MinLength(1)
    @IsUUID()
    @IsOptional()
    public id_cleaning_action?: string

}
