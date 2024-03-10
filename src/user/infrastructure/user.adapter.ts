import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { IUser } from '../domain/repository/IUser';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Either } from 'src/generics/Either';
import { User } from '../domain/User';
import { RolEntity } from 'src/rol/infrastructure/entities/rol.entity';

@Injectable()
export class adapterUserRepository implements IUser<UserEntity> {

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,

    @InjectRepository(RolEntity)
    private readonly repositoryRol: Repository<RolEntity>
  ) {}

  async userRegister(user: User): Promise<Either<Error, UserEntity>> {
    const rol = await this.repositoryRol.findOneBy({name: "HK"});
    const userToCreate: UserEntity = UserEntity.create();
          userToCreate.id = user.getId().getIDUser();
          userToCreate.username = user.getCredentials().getUserName()
          userToCreate.email = user.getCredentials().getEmail();
          userToCreate.password = user.getCredentials().getPassword();
          userToCreate.first_name = user.getNames().getFirstName();
          userToCreate.last_name = user.getNames().getLastName();
          userToCreate.phone_number_1 = user.getPhoneNumber().getPhoneNumber1();
          userToCreate.code_area_1 = user.getPhoneNumber().getCodeArea1();
          userToCreate.rol = rol;
    try{
      
      const result = await this.repository.save(userToCreate);
      return Either.makeRight<Error, UserEntity>(userToCreate);

    }catch(error){
      if(error.code === `23505` ) {
        return Either.makeLeft<Error, UserEntity>(new Error(`User exits in database ${ JSON.stringify( error.detail ) }`));
      }
      console.log(error);
      return Either.makeLeft<Error, UserEntity>(error);
    } 
  }

   async getUsers(): Promise<Either<Error, UserEntity[]>> {
    
    try {
      let result = await this.repository.find();
      return Either.makeRight<Error, UserEntity[]>(result)
    } catch (error) {
      return Either.makeLeft<Error,UserEntity[]>(new Error("Error, try later"))
    
    }
    
  }

  async authUser(email: string, password: string): Promise<Either<Error, UserEntity>>{
    const userLog = await this.repository.findOne({
      where:{email:email,
      password:password},
      relations:{
        rol:true
      },
    })
    if(userLog) return Either.makeRight(userLog)
    return Either.makeLeft(new Error('Credenciales incorrectas'));
  }

}
