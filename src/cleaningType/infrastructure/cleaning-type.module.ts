import { Module } from '@nestjs/common';
import { cleaningTypeAdapter } from './cleaning-type.adapter';
import { CleaningTypeController } from './cleaning-type.controller';
import { createCleaningTypeService } from '../application/createCleaningTypeService';
import { CleaningTypeEntity } from './entities/cleaning-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getCleaningTypeService } from '../application/getCleaningTypeService';
import { CleaningCheckEntity } from 'src/cleaningCheck/infrastructure/entities/cleaning-check.entity';
import { PermissionsEntity } from 'src/permissions/infrastructure/entities/permission.entity';
import { RolEntity } from 'src/rol/infrastructure/entities/rol.entity';
import { RoomEntity } from 'src/room/infrastructure/entities/room.entity';

@Module({
  controllers: [CleaningTypeController],
  providers: [cleaningTypeAdapter, createCleaningTypeService, 
    getCleaningTypeService],
  imports:[
    TypeOrmModule.forFeature([CleaningTypeEntity]),
    TypeOrmModule.forFeature([CleaningCheckEntity]),
    TypeOrmModule.forFeature([PermissionsEntity]),
    TypeOrmModule.forFeature([RolEntity]),
    TypeOrmModule.forFeature([RoomEntity])
  ]
})
export class CleaningTypeModule {}
