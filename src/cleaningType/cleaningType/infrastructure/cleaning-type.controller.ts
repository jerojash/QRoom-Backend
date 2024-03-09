import { Response, Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { cleaningTypeAdapter } from './cleaning-type.adapter';
import { CreateCleaningTypeDto } from '../application/dto/create-cleaning-type.dto';
import { UpdateCleaningTypeDto } from '../application/dto/update-cleaning-type.dto';
import { createCleaningTypeService } from '../application/createCleaningTypeService';
import { CleaningTypeEntity } from './entities/cleaning-type.entity';

@Controller('cleaning-type')
export class CleaningTypeController {
  constructor(private readonly cleaningTypeAdapter: cleaningTypeAdapter,
    private readonly createCleaningService: createCleaningTypeService<CleaningTypeEntity>) 
    {
      this.createCleaningService = new createCleaningTypeService(cleaningTypeAdapter)
    }

  @Post()
  async create(@Body() createCleaningTypeDto: CreateCleaningTypeDto, @Response() res) {
    let result = await this.createCleaningService.execute(createCleaningTypeDto);

    if (result.isLeft()) {
      return res.status(HttpStatus.CONFLICT).json(result.getLeft().message);
    }else{
      return res.status(HttpStatus.OK).json(result.getRight());
    }
  }

  @Get()
  findAll() {
    return this.cleaningTypeAdapter.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cleaningTypeAdapter.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCleaningTypeDto: UpdateCleaningTypeDto) {
  //   return this.cleaningTypeAdapter.update(+id, updateCleaningTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cleaningTypeService.remove(+id);
  // }
}
