import { Injectable } from '@nestjs/common';
import { RolEntity } from './entities/rol.entity';
import { IRol } from '../domain/repository/IRol';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../domain/Rol';
import { Either } from 'src/generics/Either';

@Injectable()
export class adapterRolRepository implements IRol<RolEntity>{
    constructor(
        @InjectRepository(RolEntity)
        private readonly repository: Repository<RolEntity>
      ) {}

    async createRol(rol: Rol): Promise<Either<Error, RolEntity>>{
        const rolToCreate = RolEntity.create()
        rolToCreate.id = rol.getIdRol().getIdRol();
        rolToCreate.name = rol.getName().getName();

        try {
            const result = await this.repository.save(rolToCreate);
            return Either.makeRight<Error, RolEntity>(result);
        } catch (error) {
            if(error.code === `23505` ) 
                return Either.makeLeft<Error, RolEntity>(new Error(`Rol exits in database ${ JSON.stringify( error.detail ) }`));
    
            console.log(error);
            return Either.makeLeft<Error, RolEntity>(error);
        }
    }
    async getRoles(): Promise<Either<Error, RolEntity[]>>{
        return 
    }

}
