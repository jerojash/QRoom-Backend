import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CleaningActionAdapter } from './cleaning-action.adapter';
import { CreateCleaningActionDto } from '../application/dto/create-cleaning-action.dto';
import { UpdateCleaningActionDto } from '../application/dto/update-cleaning-action.dto';

@Controller('cleaning-action')
export class CleaningActionController {
  constructor(private readonly CleaningActionAdapter: CleaningActionAdapter) {}

  @Post()
  create(@Body() createCleaningActionDto: CreateCleaningActionDto) {
    return this.CleaningActionAdapter.create(createCleaningActionDto);
  }

  @Get()
  findAll() {
    return this.CleaningActionAdapter.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CleaningActionAdapter.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCleaningActionDto: UpdateCleaningActionDto) {
    return this.CleaningActionAdapter.update(+id, updateCleaningActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CleaningActionAdapter.remove(+id);
  }
}
