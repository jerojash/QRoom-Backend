import { Module } from '@nestjs/common';
import { cleaningCheckAdapter } from './cleaning-check.adapter';
import { CleaningCheckController } from './cleaning-check.controller';
import { createCleaningCheckService } from '../application/createCleaningCheckService';
import { CleaningCheckEntity } from './entities/cleaning-Check.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getCleaningCheckService } from '../application/getCleaningCheckService';
import { CleaningTypeEntity } from 'src/cleaningType/infrastructure/entities/cleaning-type.entity';

@Module({
  controllers: [CleaningCheckController],
  providers: [cleaningCheckAdapter, createCleaningCheckService, 
    getCleaningCheckService],
  imports:[
    TypeOrmModule.forFeature([CleaningCheckEntity]),
    TypeOrmModule.forFeature([CleaningTypeEntity])
  ]
})
export class CleaningCheckModule {}
