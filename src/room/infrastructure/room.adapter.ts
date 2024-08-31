import { Injectable } from '@nestjs/common';
import { IRoom } from '../domain/repository/IRoom';
import { Either } from 'src/generics/Either';
import { Room } from '../domain/room';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { Repository } from 'typeorm';
import { PermissionsEntity } from 'src/permissions/infrastructure/entities/permission.entity';
import { RolEntity } from 'src/rol/infrastructure/entities/rol.entity';
import { validate as isValidUUID } from 'uuid';
import { AreaEntity } from 'src/area/infrastructure/entities/area.entity';

@Injectable()
export class adapterRoomRepository implements IRoom<RoomEntity> {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly repository: Repository<RoomEntity>,
    @InjectRepository(PermissionsEntity)
    private readonly repoPermissions: Repository<PermissionsEntity>,
    @InjectRepository(RolEntity)
    private readonly repoRol: Repository<RolEntity>,
    @InjectRepository(AreaEntity)
    private readonly repoArea: Repository<AreaEntity>
  ) {}

   async createRoom(room: Room): Promise<Either<Error, RoomEntity>> {
    const roomToCreate = RoomEntity.create()
        roomToCreate.id = room.getIdRoom().getIdRoom();
        roomToCreate.name = room.getName().getName();

    const areaId = room.getArea().getIdArea();

    try {
      const area = await this.repoArea.findOne({
        where: {
          id: areaId,
        }
      })
      if(!area) return Either.makeLeft<Error, RoomEntity>(new Error('Area not found'));
      roomToCreate.area = area;
      const result = await this.repository.save(roomToCreate);
      return Either.makeRight<Error, RoomEntity>(result);
    } catch (error) {
        if(error.code === `23505` ) 
            return Either.makeLeft<Error, RoomEntity>(new Error(`Room exits in database ${ JSON.stringify( error.detail ) }`));

        console.log(error);
        return Either.makeLeft<Error, RoomEntity>(error);
    }
  }

  async getRooms(): Promise<Either<Error, RoomEntity[]>> {
    try {
      let result = await this.repository.find({
        relations: {
          area: true
        }
      })
  
      return Either.makeRight<Error,RoomEntity[]>(result);
    } catch (error) {
        console.log(error);
        return Either.makeLeft<Error, RoomEntity[]>(error);
    }
  }
  

   async getRoomById(id: string, userRol: string): Promise<Either<Error, RoomEntity>> {
    try {
      if (!isValidUUID(id))
        return Either.makeLeft<Error,RoomEntity>(new Error('Not UUID'));
      
      const rolUser = await this.repoRol.findOne({
        where: {
          name: userRol
        }
      })
      if(!rolUser) return Either.makeLeft<Error,RoomEntity>(new Error('403'));

      let result = await this.repository.findOne({
        where: {
          id:id
        },
        relations: {
          area: true
        }
      })
  
      if (!result) return Either.makeLeft<Error,RoomEntity>(new Error('404'));

      const permission = await this.repoPermissions.findOne({
        where : {
          rol: rolUser,
          room: result
        }
      })
      // if(!permission) return Either.makeLeft<Error,RoomEntity>(new Error('403'));
 
      return Either.makeRight<Error,RoomEntity>(result);
    } catch (error) {
        console.log(error);
        return Either.makeLeft<Error, RoomEntity>(error);
    }
    }
}

