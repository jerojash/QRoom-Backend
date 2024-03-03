import { Module } from '@nestjs/common';
import { adapterUserRepository } from './user.adapter';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { createUserService } from '../application/createUserService';
import { getUserService } from '../application/getUserService';

@Module({
  controllers: [UserController],
  providers: [adapterUserRepository, createUserService, getUserService],
  imports:[
    TypeOrmModule.forFeature([UserEntity])
  ]
})
export class UserModule {}
