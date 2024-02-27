import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus, Response } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { createUserService } from '../application/createUserService';
import { adapterUserRepository } from './user.adapter';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor( private readonly repoIuser: adapterUserRepository,
    private readonly createUser: createUserService<UserEntity>
    ) {
      this.createUser = new createUserService(repoIuser)
    }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    
    let result = await this.createUser.execute(createUserDto);
    
    if (result.isLeft()) {
      return res.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
    }else{
      return res.status(HttpStatus.OK).json(result.getRight());
    }
    
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

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
