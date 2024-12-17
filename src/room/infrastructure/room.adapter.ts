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
import { CleaningActionEntity } from 'src/cleaningAction/infrastructure/entities/cleaning-action.entity';

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
    private readonly repoArea: Repository<AreaEntity>,
    @InjectRepository(CleaningActionEntity)
    private readonly repoCleaningAction: Repository<CleaningActionEntity>
  ) {}

  async createRoom(room: Room): Promise<Either<Error, RoomEntity>> {
    const roomToCreate = RoomEntity.create();
    roomToCreate.id = room.getIdRoom().getIdRoom();
    roomToCreate.name = room.getName().getName();
    roomToCreate.order = room.getOrder().getOrder();

    const areaId = room.getArea().getIdArea();

    try {
      const area = await this.repoArea.findOne({
        where: {
          id: areaId,
        },
      });
      if (!area)
        return Either.makeLeft<Error, RoomEntity>(new Error('Area not found'));
      roomToCreate.area = area;
      const result = await this.repository.save(roomToCreate);
      return Either.makeRight<Error, RoomEntity>(result);
    } catch (error) {
      if (error.code === `23505`)
        return Either.makeLeft<Error, RoomEntity>(
          new Error(`Room exits in database ${JSON.stringify(error.detail)}`)
        );

      console.log(error);
      return Either.makeLeft<Error, RoomEntity>(error);
    }
  }

  async getRooms(): Promise<Either<Error, RoomEntity[]>> {
    try {
      let result = await this.repository.find({
        relations: {
          area: true,
        },
        select: {
          id: true,
          name: true,
          area: {
            id: true,
            name: true,
          },
        },
      });

      return Either.makeRight<Error, RoomEntity[]>(result);
    } catch (error) {
      console.log(error);
      return Either.makeLeft<Error, RoomEntity[]>(error);
    }
  }

  async getRoomById(id: string, userRol: string): Promise<Either<Error, any>> {
    try {
      if (!isValidUUID(id))
        return Either.makeLeft<Error, any>(new Error('Not UUID'));

      const rolUser = await this.repoRol.findOne({
        where: {
          name: userRol,
        },
      });
      if (!rolUser) return Either.makeLeft<Error, any>(new Error('403'));

      let result = await this.repository.findOne({
        where: {
          id: id,
        },
        relations: {
          area: true,
        },
        select: {
          id: true,
          name: true,
          area: {
            id: true,
            name: true,
          },
        },
      });

      if (!result) return Either.makeLeft<Error, any>(new Error('404'));

      const cleaning_action = await this.repoCleaningAction.find({
        where: {
          room_: result,
        },
        relations: {
          cleaning_type_: true,
        },
        order: {
          end_time_hk: 'DESC',
        },
        take: 1,
      });

      const status = checkCleaningStatus(
        new Date(cleaning_action[0].end_time_hk)
      );

      // const permission = await this.repoPermissions.findOne({
      //   where: {
      //     rol: rolUser,
      //     room: result,
      //   },
      // });
      // if(!permission) return Either.makeLeft<Error,any>(new Error('403'));

      return Either.makeRight<Error, any>({
        ...result,
        ...status,
        lasCleaningAction: cleaning_action[0].cleaning_type_.name ?? null,
      });
    } catch (error) {
      console.log(error);
      return Either.makeLeft<Error, any>(error);
    }
  }
}

function checkCleaningStatus(date: Date | undefined):
  | {
      lastCleaning: string;
      status: string;
    }
  | undefined {
  if (!date) return { lastCleaning: null, status: null };

  // Obtener la fecha actual en GMT8
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 4); // Ajustamos a GMT8

  // Calcular la diferencia en milisegundos
  const diffInMs = now.getTime() - date.getTime();

  // Convertir la diferencia a minutos, horas y días
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Formatear el string "lastCleaning"
  let lastCleaning: string;
  if (diffInMins < 60) {
    lastCleaning = `${diffInMins} minutes ago`;
  } else if (diffInHours < 24) {
    lastCleaning = `${diffInHours} hours ago`;
  } else {
    lastCleaning = `${diffInDays} days ago`;
  }

  // Determinar el estado de limpieza
  const status = diffInHours <= 24 ? 'Clean' : 'Not Clean';

  return { lastCleaning, status };
}
