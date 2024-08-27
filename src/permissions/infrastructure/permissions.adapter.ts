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
import { CleaningTypeEntity } from 'src/cleaningType/infrastructure/entities/cleaning-type.entity';

@Injectable()
export class PermissionsAdapter implements IPermissions{
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly repository: Repository<PermissionsEntity>,
    @InjectRepository(RoomEntity)
    private readonly repoRoom: Repository<RoomEntity>,
    @InjectRepository(RolEntity)
    private readonly repoRol: Repository<RolEntity>,
    @InjectRepository(CleaningTypeEntity)
    private readonly repoCleaningType: Repository<CleaningTypeEntity>,
) {}

  async createPermissions(permissions: Permissions) {
    const permissionToCreate = PermissionsEntity.create()
      const id_rol = permissions.getIdRol().getIdRol();
      const id_room = permissions.getIdRoom().getIdRoom();
      const id_cleaning_type = permissions.getIdCleaningType().getIdCleaningType();
      
      try {

        // Verify if rol exists
        let rol = await this.repoRol.findOne({
          where: {
            id: id_rol
          }
        });
        console.log('ROL: ', rol);
        if (!rol) return Either.makeLeft<Error, string>(new Error('Rol not found'));
        permissionToCreate.rol = rol;
        
        // Verify if room exists
        let room = await this.repoRoom.findOne({
          where: {
            id: id_room
          }
        });
        console.log('ROOM: ', room);
        if (!room) return Either.makeLeft<Error, string>(new Error('Room not found'));
        permissionToCreate.room = room;
      
        // Verify if cleaning type exists
        let cleaning_type = await this.repoCleaningType.findOne({
          where: {
            id: id_cleaning_type
          }
        });
        console.log('CLEANING_TYPE: ', cleaning_type);
        if (!id_cleaning_type) return Either.makeLeft<Error, string>(new Error('Cleaning type not found'));
        permissionToCreate.cleaningType = cleaning_type;
        
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
