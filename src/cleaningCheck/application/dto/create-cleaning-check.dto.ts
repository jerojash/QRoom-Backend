import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCleaningCheckDto {
  @IsArray()
  public name: string[];

  @IsOptional()
  @IsUUID()
  public type_id?: string;

  @IsNumber()
  public order: number;

  @IsOptional()
  @IsUUID()
  public id_parent_task?: string;
}
