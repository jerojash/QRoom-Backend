import { Injectable } from '@nestjs/common';
import { CreateCleaningTypeDto } from '../application/dto/create-cleaning-type.dto';
import { UpdateCleaningTypeDto } from '../application/dto/update-cleaning-type.dto';
import { ICleaningType } from '../domain/repository/ICleaningType';
import { CleaningTypeEntity } from './entities/cleaning-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Either } from 'src/generics/Either';
import { CleaningType } from '../domain/cleaningType';

@Injectable()
export class cleaningTypeAdapter implements ICleaningType<CleaningTypeEntity> {

  constructor(
    @InjectRepository(CleaningTypeEntity)
    private readonly repository: Repository<CleaningTypeEntity>
  ) {}

  async createCleaningType(cleaningType: CleaningType): Promise<Either<Error, CleaningTypeEntity>>
  {
    const cleaningTypeToCreate = CleaningTypeEntity.create();
    cleaningTypeToCreate.id = cleaningType.getId().getId();
    cleaningTypeToCreate.name = cleaningType.getName().getName();
    cleaningTypeToCreate.description = cleaningType.getDescription().getDescription();

    try {
      const result = await this.repository.save(cleaningTypeToCreate);
      return Either.makeRight<Error, CleaningTypeEntity>(result);
    } catch (error) {
        if(error.code === `23505` ) 
            return Either.makeLeft<Error, CleaningTypeEntity>(new Error(`Rol exits in database ${ JSON.stringify( error.detail ) }`));

        console.log(error);
        return Either.makeLeft<Error, CleaningTypeEntity>(error);
    }
  }

  async getCleaningType(): Promise<Either<Error, CleaningTypeEntity[]>> {
    
    try {
      let result = await this.repository.find({
        relations:{
          check: true
        }
      });
      return Either.makeRight<Error, CleaningTypeEntity[]>(result)
    } catch (error) {
      return Either.makeLeft<Error,CleaningTypeEntity[]>(new Error("Error, try later"))
    
    }
    
  }

  findAll() {
    return `This action returns all cleaningType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cleaningType`;
  }

  update(id: number, updateCleaningTypeDto: UpdateCleaningTypeDto) {
    return `This action updates a #${id} cleaningType`;
  }

  remove(id: number) {
    return `This action removes a #${id} cleaningType`;
  }
}
