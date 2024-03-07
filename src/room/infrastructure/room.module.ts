import { Module } from '@nestjs/common';
import { RoomService } from './room.adapter';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
