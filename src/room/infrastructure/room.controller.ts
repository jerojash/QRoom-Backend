import { Controller, Get, Post, Body, Patch, Param, Response, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { adapterRoomRepository } from './room.adapter';
import { CreateRoomDto } from '../application/dto/create-room.dto';
import { UpdateRoomDto } from '../application/dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { createRoomService } from '../application/createRoomService';
import { getRoomByIdService } from '../application/getRoomByIdService';
import { getRoomsService } from '../application/getRoomService';

@Controller('room')
export class RoomController {
  constructor(private readonly repoIRoom: adapterRoomRepository,
    private readonly createRoom: createRoomService<RoomEntity>,
    private readonly getRoomById: getRoomByIdService<RoomEntity>,
    private readonly getRooms: getRoomsService<RoomEntity>) {
      this.createRoom = new createRoomService(repoIRoom);
      this.getRoomById = new getRoomByIdService(repoIRoom);
      this.getRooms = new getRoomsService(repoIRoom);
    }

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    let result =  await this.createRoom.execute(createRoomDto);

    if (result.isLeft()) return result.getLeft();
    return result.getRight();
  }

  @Get()
  async findAll() {
    let result =  await this.getRooms.execute();

    if (result.isLeft()) return result.getLeft();
    return result.getRight();
  }

  @Get(':id/:rol')
  async findOne(@Response() res,
                @Param('id', ParseUUIDPipe) id: string, 
                @Param('rol') rol: string) {
    let result =  await this.getRoomById.execute(id.toString(), rol.toString());

    if (result.isLeft()) {
      switch(result.getLeft().message) { 
        case '403': { 
           return res.status(HttpStatus.FORBIDDEN).json('FORBIDDEN');  
        } 
        case '404': { 
          return res.status(HttpStatus.NOT_FOUND).json('ROOM NOT FOUND');  
       } 
        default: { 
          return res.status(HttpStatus.BAD_REQUEST).json('BAD REQUEST');  
       } 
     }  
      
    }else{
      return res.status(HttpStatus.OK).json(result.getRight());
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
  //   return this.roomService.update(+id, updateRoomDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roomService.remove(+id);
  // }
}
