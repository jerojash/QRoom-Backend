import { Injectable } from '@nestjs/common';
import { CreateCleaningActionDto } from '../application/dto/create-cleaning-action.dto';
import { UpdateCleaningActionDto } from '../application/dto/update-cleaning-action.dto';

@Injectable()
export class CleaningActionAdapter {
  create(createCleaningActionDto: CreateCleaningActionDto) {
    return 'This action adds a new cleaningAction';
  }

  findAll() {
    return `This action returns all cleaningAction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cleaningAction`;
  }

  update(id: number, updateCleaningActionDto: UpdateCleaningActionDto) {
    return `This action updates a #${id} cleaningAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} cleaningAction`;
  }
}
