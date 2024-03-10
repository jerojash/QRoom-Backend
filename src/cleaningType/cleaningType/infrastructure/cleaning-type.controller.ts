import { Response, Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { cleaningTypeAdapter } from './cleaning-type.adapter';
import { CreateCleaningTypeDto } from '../application/dto/create-cleaning-type.dto';
import { UpdateCleaningTypeDto } from '../application/dto/update-cleaning-type.dto';
import { createCleaningTypeService } from '../application/createCleaningTypeService';
import { CleaningTypeEntity } from './entities/cleaning-type.entity';
import { getCleaningTypeService } from '../application/getCleaningTypeService';

@Controller('cleaning-type')
export class CleaningTypeController {
  constructor(private readonly cleaningTypeAdapter: cleaningTypeAdapter,
    private readonly createCleaningService: createCleaningTypeService<CleaningTypeEntity>,
    private readonly getCleaningService: getCleaningTypeService<CleaningTypeEntity>) 
    {
      this.createCleaningService = new createCleaningTypeService(cleaningTypeAdapter);
      this.getCleaningService = new getCleaningTypeService(cleaningTypeAdapter);
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
  async findAll(@Response() res) {
    let result = await this.getCleaningService.execute();

    if (result.isLeft()) {
      return res.status(HttpStatus.CONFLICT).json(result.getLeft().message);
    }else{
      return res.status(HttpStatus.OK).json(result.getRight());
    }

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
