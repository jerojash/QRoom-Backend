import { Response, Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { cleaningCheckAdapter } from './cleaning-check.adapter';
import { CreateCleaningCheckDto } from '../application/dto/create-cleaning-check.dto';
import { UpdateCleaningCheckDto } from '../application/dto/update-cleaning-check.dto';
import { createCleaningCheckService } from '../application/createCleaningCheckService';
import { CleaningCheckEntity } from './entities/cleaning-check.entity';
import { getCleaningCheckService } from '../application/getCleaningCheckService';

@Controller('cleaning-check')
export class CleaningCheckController {
  constructor(private readonly cleaningCheckAdapter: cleaningCheckAdapter,
    private readonly createCleaningService: createCleaningCheckService<CleaningCheckEntity>,
    private readonly getCleaningService: getCleaningCheckService<CleaningCheckEntity>) 
    {
      this.createCleaningService = new createCleaningCheckService(cleaningCheckAdapter);
      this.getCleaningService = new getCleaningCheckService(cleaningCheckAdapter);
    }

  @Post()
  async create(@Body() createCleaningCheckDto: CreateCleaningCheckDto, @Response() res) {
    let result = await this.createCleaningService.execute(createCleaningCheckDto);

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
  //   return this.cleaningCheckAdapter.findOne(+id);
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
