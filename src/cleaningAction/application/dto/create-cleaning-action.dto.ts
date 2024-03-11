import { IsString, MinLength, IsUUID, IsOptional, IsDate } from "class-validator"

export class CreateCleaningActionDto {
    @IsString()
    @IsUUID()
    @IsOptional()
    public id_room?: string 

    @IsString()
    @IsOptional()
    public user_rol?: string 

    @IsString()
    @IsUUID()
    @IsOptional()
    public id_hk?: string

    @IsString()
    @IsUUID()
    @IsOptional()
    public id_sup?: string

    @IsString()
    @IsUUID()
    @IsOptional()
    public id_cleaning_type?: string

    @IsString()
    @IsOptional()
    // @IsDate()
    public time_hk?: string

    @IsString()
    @IsOptional()
    // @IsDate()
    public time_sup?: string

}
