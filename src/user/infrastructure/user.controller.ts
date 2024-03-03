import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus, Response } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { createUserService } from '../application/createUserService';
import { adapterUserRepository } from './user.adapter';
import { UserEntity } from './entities/user.entity';
import { getUserService } from '../application/getUserService';

@Controller('user')
export class UserController {
  constructor( private readonly repoIuser: adapterUserRepository,
    private readonly createUser: createUserService<UserEntity>,
    private readonly getUsers: getUserService<UserEntity>
    ) {
      this.createUser = new createUserService(repoIuser);
      this.getUsers = new getUserService(repoIuser);
    }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    
    let result = await this.createUser.execute(createUserDto);
    
    if (result.isLeft()) {
      return res.status(HttpStatus.CONFLICT).json(result.getLeft().message);
    }else{
      return res.status(HttpStatus.OK).json(result.getRight());
    }
  }

  @Get()
  async findAll(@Response() res) {
    let result = await this.getUsers.execute();
    
    if (result.isLeft()) {
      return res.status(HttpStatus.CONFLICT).json(result.getLeft().message);
    }else{
      return res.status(HttpStatus.OK).json(result.getRight());
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
