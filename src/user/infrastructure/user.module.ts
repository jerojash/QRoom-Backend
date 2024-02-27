import { Module } from '@nestjs/common';
import { adapterUserRepository } from './user.adapter';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { createUserService } from '../application/createUserService';

@Module({
  controllers: [UserController],
  providers: [adapterUserRepository, createUserService],
  imports:[
    TypeOrmModule.forFeature([UserEntity])
  ]
})
export class UserModule {}
