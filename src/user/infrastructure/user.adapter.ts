import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { IUser } from '../domain/repository/IUser';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Either } from 'src/generics/Either';
import { User } from '../domain/User';

@Injectable()
export class adapterUserRepository implements IUser<UserEntity> {

  constructor(
    @InjectRepository(UserEntity)
    private readonly repositorio: Repository<UserEntity>
  ) {}

  async userRegister(usuario: User): Promise<Either<Error, UserEntity>> {
    const userToCreate: UserEntity = UserEntity.create();
          userToCreate.id = usuario.getId().getIDUser();
          userToCreate.username = usuario.getCredentials().getusername()
          userToCreate.email = usuario.getCredentials().getEmail();
          userToCreate.password = usuario.getCredentials().getPassword();
          userToCreate.first_name = usuario.getNames().getFirstName();
          userToCreate.last_name = usuario.getNames().getLastName();
          userToCreate.phone_number_1 = usuario.getPhoneNumber().getPhoneNumer1();
          userToCreate.code_area_1 = usuario.getPhoneNumber().getCodeArea1();
    try{
      
      const resultado = await this.repositorio.save(userToCreate);
      return Either.makeRight<Error, UserEntity>(resultado);
    }catch(error){
      if(error.code === `23505` ) {
        return Either.makeLeft<Error, UserEntity>(new Error(`User exits in database ${ JSON.stringify( error.detail ) }`));
      }
      console.log(error);
      return Either.makeLeft<Error, UserEntity>(error);
    } 
  }

   async getUsers(idUser: string): Promise<Either<Error, UserEntity[]>> {
    
    try {
      let result = await this.repositorio.find();
      return Either.makeRight<Error, UserEntity[]>(result)
    } catch (error) {
      return Either.makeLeft<Error,UserEntity[]>(new Error("Error, try later"))
      
    }
    


  }

}
