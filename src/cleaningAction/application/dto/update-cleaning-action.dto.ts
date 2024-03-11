import { PartialType } from '@nestjs/mapped-types';
import { CreateCleaningActionDto } from './create-cleaning-action.dto';

export class UpdateCleaningActionDto extends PartialType(CreateCleaningActionDto) {}
