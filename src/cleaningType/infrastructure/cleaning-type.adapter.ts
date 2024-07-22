import { Injectable } from '@nestjs/common';
import { CreateCleaningTypeDto } from '../application/dto/create-cleaning-type.dto';
import { UpdateCleaningTypeDto } from '../application/dto/update-cleaning-type.dto';
import { ICleaningType } from '../domain/repository/ICleaningType';
import { CleaningTypeEntity } from './entities/cleaning-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, IsNull, Repository } from 'typeorm';
import { Either } from 'src/generics/Either';
import { CleaningType } from '../domain/cleaningType';
import { RolEntity } from 'src/rol/infrastructure/entities/rol.entity';
import { RoomEntity } from 'src/room/infrastructure/entities/room.entity';
import { PermissionsEntity } from 'src/permissions/infrastructure/entities/permission.entity';

@Injectable()
export class cleaningTypeAdapter implements ICleaningType<CleaningTypeEntity> {

  constructor(
    @InjectRepository(CleaningTypeEntity)
    private readonly repository: Repository<CleaningTypeEntity>,
    @InjectRepository(RolEntity)
    private readonly repoRol: Repository<RolEntity>,
    @InjectRepository(RoomEntity)
    private readonly repoRoom: Repository<RoomEntity>,
    @InjectRepository(PermissionsEntity)
    private readonly repoPermissions: Repository<PermissionsEntity>
  ) {}

  async createCleaningType(cleaningType: CleaningType): Promise<Either<Error, CleaningTypeEntity>>
  {
    const cleaningTypeToCreate = CleaningTypeEntity.create();
    cleaningTypeToCreate.id = cleaningType.getId().getId();
    cleaningTypeToCreate.name = cleaningType.getName().getName();
    cleaningTypeToCreate.id_room = cleaningType.getIdRoom().getIdRoom();
    cleaningTypeToCreate.created_at = new Date();

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

  async getCleaningType(idRoom: string, userRol: string): Promise<Either<Error, CleaningTypeEntity[]>> {
    
    try {
      // Verify if rol exists
      let rol = await this.repoRol.findOne({
        where: {
          name: userRol
        }
      });
      console.log('ROL: ', rol);
      if (!rol) return Either.makeLeft<Error, CleaningTypeEntity[]>(new Error('Rol not found'));
      
      // Verify if room exists
      let room = await this.repoRoom.findOne({
        where: {
          id: idRoom
        }
      })
      if (!room) return Either.makeLeft<Error, CleaningTypeEntity[]>(new Error('Room not found'));
      
      // let result = await this.repository.find({
      //   relations:['check', 'check.sub_task', 'check.sub_task.sub_task']
      // });

      const cleaningTypeWithRoom = await this.repository.find({
        select : {
          id: true,
          name: true,
          check: {  
            id: true,
            name: true,
            sub_task: {
              id: true,
              name: true,
              sub_task: {
                id: true,
                name: true,
              }
            }
          },
        },
        order: {
          created_at: 'ASC',
          check: {
            created_at: 'ASC',
            sub_task: {
              created_at: 'ASC',
              sub_task: {
                created_at: 'ASC',
              }
            }
          }
        },
          relations: ['check', 'check.sub_task', 'check.sub_task.sub_task'],
        where : {
          id_room: idRoom
        }
      });

      console.log('TYPES with room: ', cleaningTypeWithRoom);

      const cleaningTypesWithoutRoom = await this.repository.find({
        select : {
          id: true,
          name: true,
          check: {  
            id: true,
            name: true,
            sub_task: {
              id: true,
              name: true,
              sub_task: {
                id: true,
                name: true,
              }
            }
          },
        },
        order: {
          created_at: 'ASC',
          check: {
            created_at: 'ASC',
            sub_task: {
              created_at: 'ASC',
              sub_task: {
                created_at: 'ASC',
              }
            }
          }
        },
          relations: ['check', 'check.sub_task', 'check.sub_task.sub_task'],
        where : {
          id_room: IsNull()
        }
      });

    console.log('TYPES without room: ', cleaningTypesWithoutRoom);
    
    let cleaningTypes
    if (cleaningTypeWithRoom.length > 0) {
      console.log('ENTRO AL IF');
      cleaningTypes = cleaningTypeWithRoom
    }
    else  { console.log('ENTRO AL ELSE');
      cleaningTypes = cleaningTypesWithoutRoom
    }
  
      // Obtener todas las entidades Permissions que coinciden con roomId y userRolId
      const permissions = await this.repoPermissions.find({
        where: {
          rol: rol,
        },
        relations: {
          cleaningType: true
        }
      });

      console.log('PERMISSIONS: ', permissions);
  
      // Filtrar las entidades CleaningType que están en Permissions
      const allowedCleaningTypeIds = permissions.map(permission => permission.cleaningType.id);
      // console.log('ALLOWED: ', allowedCleaningTypeIds);
      const result = cleaningTypes.filter(cleaningType => allowedCleaningTypeIds.includes(cleaningType.id));
      // console.log('RESULT: ', result);
      return Either.makeRight<Error, CleaningTypeEntity[]>(result)
    } catch (error) {
      console.log(error);
      return Either.makeLeft<Error,CleaningTypeEntity[]>(new Error(error))
    
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
