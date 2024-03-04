import { Module } from '@nestjs/common';
import {adapterRolRepository } from './rol.adapter';
import { RolController } from './rol.controller';
import { createRolService } from '../application/createRolService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from './entities/rol.entity';

@Module({
  controllers: [RolController],
  providers: [createRolService, adapterRolRepository],
  imports:[
    TypeOrmModule.forFeature([RolEntity])
  ]
})
export class RolModule {}
