import { Module } from '@nestjs/common';
import { adapterUserRepository } from './user.adapter';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { createUserService } from '../application/createUserService';
import { getUserService } from '../application/getUserService';
import { RolEntity } from 'src/rol/infrastructure/entities/rol.entity';
import { authService } from '../application/authService';

@Module({
  controllers: [UserController],
  providers: [adapterUserRepository, createUserService, getUserService,
  authService],
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RolEntity])
  ]
})
export class UserModule {}
