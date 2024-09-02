import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaEntity } from './entities/area.entity';
import { Repository } from 'typeorm';
import { Either } from 'src/generics/Either';
import { Area } from '../domain/area';
import { IArea } from '../domain/repository/IArea';

@Injectable()
export class adapterAreaService implements IArea<AreaEntity>{
  constructor(
    @InjectRepository(AreaEntity)
    private readonly repository: Repository<AreaEntity>,
  ) {}
  async createArea(area: Area): Promise<Either<Error,AreaEntity>> {
    const areaToCreate = AreaEntity.create();
    areaToCreate.id = area.getIdArea().getIdArea();
    areaToCreate.name = area.getName().getName();
    areaToCreate.order = area.getOrder().getOrder();
    
    try {
      const result = await this.repository.save(areaToCreate);
      return Either.makeRight<Error, AreaEntity>(result);
  } catch (error) {
      if(error.code === `23505` ) 
          return Either.makeLeft<Error, AreaEntity>(new Error(`Area exits in database ${ JSON.stringify( error.detail ) }`));
      console.log(error);
      return Either.makeLeft<Error, AreaEntity>(error);
  }
  }

  async getAreas(): Promise<Either<Error, AreaEntity[]>> {
    try {
      let result = await this.repository.find()
  
      return Either.makeRight<Error,AreaEntity[]>(result);
    } catch (error) {
        console.log(error);
        return Either.makeLeft<Error, AreaEntity[]>(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
