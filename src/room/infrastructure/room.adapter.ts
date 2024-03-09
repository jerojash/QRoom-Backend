import { Injectable } from '@nestjs/common';
import { IRoom } from '../domain/repository/IRoom';
import { Either } from 'src/generics/Either';
import { Room } from '../domain/room';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class adapterRoomRepository implements IRoom<RoomEntity> {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly repository: Repository<RoomEntity>
  ) {}

   async createRoom(room: Room): Promise<Either<Error, RoomEntity>> {
    const roomToCreate = RoomEntity.create()
        roomToCreate.id = room.getIdRoom().getIdRoom();
        roomToCreate.name = room.getName().getName();
        roomToCreate.area = room.getArea().getArea();

        try {
            const result = await this.repository.save(roomToCreate);
            return Either.makeRight<Error, RoomEntity>(result);
        } catch (error) {
            if(error.code === `23505` ) 
                return Either.makeLeft<Error, RoomEntity>(new Error(`Room exits in database ${ JSON.stringify( error.detail ) }`));
    
            console.log(error);
            return Either.makeLeft<Error, RoomEntity>(error);
        }
    
    return
  }

  async getRooms(room: Room): Promise<Either<Error, RoomEntity[]>> {
      return
  }

   async getRoomById(id: string): Promise<Either<Error, RoomEntity>> {
    return    
  }
}

