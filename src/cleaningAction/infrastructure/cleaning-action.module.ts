import { Module } from '@nestjs/common';
import { CleaningActionAdapter } from './cleaning-action.adapter';
import { CleaningActionController } from './cleaning-action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CleaningActionEntity } from './entities/cleaning-action.entity';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { CleaningTypeEntity } from 'src/cleaningType/infrastructure/entities/cleaning-type.entity';

@Module({
  controllers: [CleaningActionController],
  providers: [CleaningActionAdapter],
  imports:[
    TypeOrmModule.forFeature([CleaningActionEntity]),
    TypeOrmModule.forFeature([CleaningTypeEntity]),
    TypeOrmModule.forFeature([UserEntity])
  ]
})
export class CleaningActionModule {}
