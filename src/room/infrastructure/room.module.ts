import { Module } from '@nestjs/common';
import { adapterRoomRepository } from './room.adapter';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { createRoomService } from '../application/createRoomService';
import { getRoomByIdService } from '../application/getRoomByIdService';
import { getRoomsService } from '../application/getRoomService';
import { CleaningActionEntity } from 'src/cleaningAction/infrastructure/entities/cleaning-action.entity';
import { PermissionsEntity } from 'src/permissions/infrastructure/entities/permission.entity';
import { RolEntity } from 'src/rol/infrastructure/entities/rol.entity';

@Module({
  controllers: [RoomController],
  providers: [adapterRoomRepository, createRoomService, 
    getRoomByIdService, getRoomsService],
  imports:[
    TypeOrmModule.forFeature([RoomEntity]),
    TypeOrmModule.forFeature([CleaningActionEntity]),
    TypeOrmModule.forFeature([PermissionsEntity]),
    TypeOrmModule.forFeature([RolEntity])
  ]
})
export class RoomModule {}
