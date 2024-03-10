import { Injectable } from '@nestjs/common';
import { CreateCleaningCheckDto } from '../application/dto/create-cleaning-check.dto';
import { UpdateCleaningCheckDto } from '../application/dto/update-cleaning-check.dto';
import { ICleaningCheck } from '../domain/repository/ICleaningCheck';
import { CleaningCheckEntity } from './entities/cleaning-check.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Either } from 'src/generics/Either';
import { CleaningCheck } from '../domain/cleaningCheck';
import { CleaningTypeEntity } from 'src/cleaningType/infrastructure/entities/cleaning-type.entity';

@Injectable()
export class cleaningCheckAdapter implements ICleaningCheck<CleaningCheckEntity> {

  constructor(
    @InjectRepository(CleaningCheckEntity)
    private readonly repository: Repository<CleaningCheckEntity>,
    @InjectRepository(CleaningTypeEntity)
    private readonly repositoryType: Repository<CleaningTypeEntity>
  ) {}

  async createCleaningCheck(cleaningCheck: CleaningCheck): Promise<Either<Error, CleaningCheckEntity>>
  {
    const cleaningCheckToCreate = CleaningCheckEntity.create();
    cleaningCheckToCreate.id = cleaningCheck.getId().getId();
    cleaningCheckToCreate.name = cleaningCheck.getName().getName();
    cleaningCheckToCreate.description = cleaningCheck.getDescription().getDescription();
    const idType = cleaningCheck.getTypeId().getId();
    try {
      const cleaningType = await this.repositoryType.findOne({
        where:{
          id: idType
        }
      })
      if (!cleaningType) return Either.makeLeft<Error, CleaningCheckEntity>(new Error('CleaningType not found'));
      cleaningCheckToCreate.type = cleaningType;
      const result = await this.repository.save(cleaningCheckToCreate);
      return Either.makeRight<Error, CleaningCheckEntity>(result);
    } catch (error) {
        if(error.code === `23505` ) 
            return Either.makeLeft<Error, CleaningCheckEntity>(new Error(`Rol exits in database ${ JSON.stringify( error.detail ) }`));

        console.log(error);
        return Either.makeLeft<Error, CleaningCheckEntity>(error);
    }
  }

  async getCleaningCheck(): Promise<Either<Error, CleaningCheckEntity[]>> {
    
    try {
      let result = await this.repository.find();
      return Either.makeRight<Error, CleaningCheckEntity[]>(result)
    } catch (error) {
      return Either.makeLeft<Error,CleaningCheckEntity[]>(new Error("Error, try later"))
    
    }
    
  }

  findAll() {
    return `This action returns all cleaningCheck`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cleaningCheck`;
  }

  update(id: number, updateCleaningCheckDto: UpdateCleaningCheckDto) {
    return `This action updates a #${id} cleaningCheck`;
  }

  remove(id: number) {
    return `This action removes a #${id} cleaningCheck`;
  }
}
