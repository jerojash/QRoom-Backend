import { Module } from '@nestjs/common';
import { adapterRoomRepository } from './room.adapter';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { createRoomService } from '../application/createRoomService';

@Module({
  controllers: [RoomController],
  providers: [adapterRoomRepository, createRoomService],
  imports:[
    TypeOrmModule.forFeature([RoomEntity])
  ]
})
export class RoomModule {}
