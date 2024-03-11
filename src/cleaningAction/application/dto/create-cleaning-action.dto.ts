import { IsString, MinLength, IsUUID, IsOptional, IsDate } from "class-validator"

export class CreateCleaningActionDto {
    @IsString()
    @IsUUID()
    @MinLength(1)
    public id_room?: string 

    @IsString()
    @IsUUID()
    @IsOptional()
    public id_cleaning_type?: string

    @IsString()
    @IsUUID()
    @IsOptional()
    public id_cleaning_action?: string

    @IsString()
    @MinLength(1)
    @IsUUID()
    public id_user?: string

    @IsString()
    @MinLength(1)
    public user_rol?: string 

    @IsString()
    @MinLength(1)
    // @IsDate()
    public time?: string


}
