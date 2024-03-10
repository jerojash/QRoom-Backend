import { Module } from '@nestjs/common';
import { adapterRoomRepository } from './room.adapter';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { createRoomService } from '../application/createRoomService';
import { getRoomByIdService } from '../application/getRoomByIdService';

@Module({
  controllers: [RoomController],
  providers: [adapterRoomRepository, createRoomService, getRoomByIdService],
  imports:[
    TypeOrmModule.forFeature([RoomEntity])
  ]
})
export class RoomModule {}
