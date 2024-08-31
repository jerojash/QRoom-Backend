import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { adapterAreaService } from './area.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEntity } from './entities/area.entity';
import { RoomEntity } from 'src/room/infrastructure/entities/room.entity';
import { createAreaService } from '../application/createAreaService';
import { getAreasService } from '../application/getAreasService';

@Module({
  controllers: [AreaController],
  providers: [adapterAreaService, createAreaService,
    getAreasService,
  ],
  imports: [
    TypeOrmModule.forFeature([AreaEntity]),
    TypeOrmModule.forFeature([RoomEntity]),
  ]
})
export class AreaModule {}
