import { PartialType } from '@nestjs/mapped-types';
import { CreateCleaningTypeDto } from './create-cleaning-type.dto';

export class UpdateCleaningTypeDto extends PartialType(CreateCleaningTypeDto) {}
