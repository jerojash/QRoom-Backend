import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { adapterRoomRepository } from './room.adapter';
import { CreateRoomDto } from '../application/dto/create-room.dto';
import { UpdateRoomDto } from '../application/dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { createRoomService } from '../application/createRoomService';

@Controller('room')
export class RoomController {
  constructor(private readonly repoIRoom: adapterRoomRepository,
    private readonly createRoom: createRoomService<RoomEntity>) {
      this.createRoom = new createRoomService(repoIRoom)
    }

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    let result =  await this.createRoom.execute(createRoomDto);

    if (result.isLeft()) return result.getLeft();
    return result.getRight();
  }

  // @Get()
  // findAll() {
  //   return this.roomService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roomService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
  //   return this.roomService.update(+id, updateRoomDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roomService.remove(+id);
  // }
}
