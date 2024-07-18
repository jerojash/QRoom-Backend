import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsAdapter } from './permissions.adapter';
import { CreatePermissionsService } from '../application/createPermissionService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from './entities/permission.entity';
import { RoomEntity } from 'src/room/infrastructure/entities/room.entity';
import { RolEntity } from 'src/rol/infrastructure/entities/rol.entity';
import { CleaningTypeEntity } from 'src/cleaningType/infrastructure/entities/cleaning-type.entity';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsAdapter, CreatePermissionsService],
  imports:[
    TypeOrmModule.forFeature([PermissionsEntity]),
    TypeOrmModule.forFeature([RoomEntity]),
    TypeOrmModule.forFeature([RolEntity]),
    TypeOrmModule.forFeature([CleaningTypeEntity])
  ]
})
export class PermissionsModule {}
