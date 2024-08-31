import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { adapterAreaService } from './area.adapter';
import { createAreaService } from '../application/createAreaService';
import { AreaEntity } from './entities/area.entity';
import { getAreasService } from '../application/getAreasService';
import { CreateAreaDto } from '../application/dto/create-area.dto';

@Controller('area')
export class AreaController {
  constructor(
    private readonly repoIArea: adapterAreaService,
    private createArea: createAreaService<AreaEntity>,
    private getAreas: getAreasService<AreaEntity>
  ){
    this.createArea = new createAreaService(repoIArea);
    this.getAreas = new getAreasService(repoIArea);
  }

  @Post()
  async create(@Body() createAreaDto: CreateAreaDto) {
    let result = await this.createArea.execute(createAreaDto);

    if (result.isLeft()) return result.getLeft();
    return result.getRight();
  }

  @Get()
  async findAll() {
    let result =  await this.getAreas.execute();

    if (result.isLeft()) return result.getLeft();
    return result.getRight();
  }
}
