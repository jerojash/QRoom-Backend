import { PartialType } from '@nestjs/mapped-types';
import { CreateCleaningCheckDto } from './create-cleaning-check.dto';

export class UpdateCleaningCheckDto extends PartialType(CreateCleaningCheckDto) {}
