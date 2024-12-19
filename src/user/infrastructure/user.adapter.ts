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
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class adapterUserRepository implements IUser<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,

    @InjectRepository(RolEntity)
    private readonly repositoryRol: Repository<RolEntity>,

    private jwtService: JwtService
  ) {}

  async userRegister(user: User): Promise<Either<Error, UserEntity>> {
    const password = user.getCredentials().getPassword();
    const passwordHash = await hash(password, 10);

    const rol = await this.repositoryRol.findOneBy({ name: 'HK' });
    const userToCreate: UserEntity = UserEntity.create();
    userToCreate.id = user.getId().getIDUser();
    userToCreate.username = user.getCredentials().getUserName();
    userToCreate.email = user.getCredentials().getEmail();
    userToCreate.password = passwordHash;
    userToCreate.first_name = user.getNames().getFirstName();
    userToCreate.last_name = user.getNames().getLastName();
    userToCreate.phone_number_1 = user.getPhoneNumber().getPhoneNumber1();
    userToCreate.code_area_1 = user.getPhoneNumber().getCodeArea1();
    userToCreate.rol = rol;
    try {
      const result = await this.repository.save(userToCreate);
      return Either.makeRight<Error, UserEntity>(userToCreate);
    } catch (error) {
      if (error.code === `23505`) {
        return Either.makeLeft<Error, UserEntity>(
          new Error(`User exits in database ${JSON.stringify(error.detail)}`)
        );
      }
      console.log(error);
      return Either.makeLeft<Error, UserEntity>(error);
    }
  }

  async getUsers(): Promise<Either<Error, UserEntity[]>> {
    try {
      let result = await this.repository.find();
      return Either.makeRight<Error, UserEntity[]>(result);
    } catch (error) {
      return Either.makeLeft<Error, UserEntity[]>(
        new Error('Error, try later')
      );
    }
  }

  async authUser(
    email: string,
    password: string
  ): Promise<Either<Error, string>> {
    const userLog = await this.repository.findOne({
      where: { email: email },
      relations: {
        rol: true,
      },
    });
    if (!userLog) return Either.makeLeft(new Error('Usuario no encontrado'));

    const checkPassword = await compare(password, userLog.password);

    if (!checkPassword)
      return Either.makeLeft(new Error('Credenciales incorrectas'));

    delete userLog.password;

    const payload = { ...userLog };

    const token = await this.jwtService.sign(payload);

    return Either.makeRight(token);
  }

  async sendEmailPasswordRecovery(
    email: string
  ): Promise<Either<Error, string>> {
    const userLog = await this.repository.findOne({
      where: { email: email },
      relations: {
        rol: true,
      },
    });
    if (!userLog) return Either.makeLeft(new Error('Usuario no encontrado'));

    // Creamos un array de 10 dígitos (del 0 al 9)
    const digits = '0123456789';

    // Inicializamos una cadena vacía para almacenar el resultado
    let result = '';

    // Iteramos 8 veces para generar cada dígito del string
    for (let i = 0; i < 8; i++) {
      // Obtenemos un índice aleatorio dentro del array de dígitos
      const randomIndex = Math.floor(Math.random() * digits.length);

      // Agregamos el dígito aleatorio al resultado
      result += digits[randomIndex];
    }

    return Either.makeRight(result);
  }

  async updateUserPassword(
    email: string,
    password: string
  ): Promise<Either<Error, UserEntity>> {
    const user = await this.repository.findOne({
      where: { email: email },
      relations: {
        rol: true,
      },
    });
    if (!user) return Either.makeLeft(new Error('Usuario no encontrado'));

    const passwordHash = await hash(password, 10);

    user.password = passwordHash;

    await user.save();

    delete user.password;

    return Either.makeRight(user);
  }
}
