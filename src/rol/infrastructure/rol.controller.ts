import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import {adapterRolRepository } from './rol.adapter';
import { CreateRolDto } from '../application/dto/create-rol.dto';
import { createRolService } from '../application/createRolService';
import { RolEntity } from './entities/rol.entity';

@Controller('rol')
export class RolController {
  constructor( private readonly repoIRol: adapterRolRepository,
    private readonly createRol: createRolService<RolEntity>
    ) 
  {
    this.createRol = new createRolService(repoIRol)
  }

  @Post()
  async create(@Body() createRolDto: CreateRolDto, @Response() res) {
    
    let result = await this.createRol.execute(createRolDto);
    
    if (result.isLeft()) {
      return res.status(HttpStatus.CONFLICT).json(result.getLeft().message);
    }else{
      return res.status(HttpStatus.OK).json(result.getRight());
    }
  }

}
