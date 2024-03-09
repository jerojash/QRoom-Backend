import { Module } from '@nestjs/common';
import { cleaningTypeAdapter } from './cleaning-type.adapter';
import { CleaningTypeController } from './cleaning-type.controller';
import { createCleaningTypeService } from '../application/createCleaningTypeService';
import { CleaningTypeEntity } from './entities/cleaning-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CleaningTypeController],
  providers: [cleaningTypeAdapter, createCleaningTypeService],
  imports:[
    TypeOrmModule.forFeature([CleaningTypeEntity])
  ]
})
export class CleaningTypeModule {}
