import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '../application/dto/create-permission.dto';
import { UpdatePermissionDto } from '../application/dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsEntity } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { IPermissions } from '../domain/repository/IPermissions';
import { Permissions } from '../domain/Permissions';
import { RoomEntity } from 'src/room/infrastructure/entities/room.entity';
import { RolEntity } from 'src/rol/infrastructure/entities/rol.entity';
import { Either } from 'src/generics/Either';

@Injectable()
export class PermissionsAdapter implements IPermissions{
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly repository: Repository<PermissionsEntity>,
    @InjectRepository(RoomEntity)
    private readonly repoRoom: Repository<RoomEntity>,
    @InjectRepository(RolEntity)
    private readonly repoRol: Repository<RolEntity>,
) {}

  async createPermissions(permissions: Permissions) {
    const permissionToCreate = PermissionsEntity.create()
      const id_rol = permissions.getIdRol().getIdRol();
      const id_room = permissions.getIdRoom().getIdRoom();
      try {
        let room = await this.repoRoom.findOne({
          where: {
            id: id_room
          }
        });
        console.log('ROOM: ', room);
        if (!room) return Either.makeLeft<Error, string>(new Error('Room not found'));

        let rol = await this.repoRol.findOne({
          where: {
            id: id_rol
          }
        });
        console.log('ROOM: ', rol);
        if (!rol) return Either.makeLeft<Error, string>(new Error('Rol not found'));
        
        permissionToCreate.rol = rol;
        permissionToCreate.room = room;
        const result = await this.repository.save(permissionToCreate);
        return Either.makeRight<Error, string>('Permission created successful');
      } catch (error) {
        if(error.code === `23505` ) 
            return Either.makeLeft<Error, string>(new Error(`Rol exits in database ${ JSON.stringify( error.detail ) }`));

        console.log(error);
        return Either.makeLeft<Error, string>(error);
      }
  }
}
