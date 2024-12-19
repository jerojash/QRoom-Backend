import { Either } from 'src/generics/Either';
import { IUser } from '../domain/repository/IUser';
import { UpdateUserDto } from './dto/update-user.dto';

export class updateUserPasswordService<T> {
  private UserRepository: IUser<T>;
  constructor(repo: IUser<T>) {
    this.UserRepository = repo;
  }
  async execute(updateDto: UpdateUserDto): Promise<Either<Error, T>> {
    return this.UserRepository.updateUserPassword(updateDto.email, updateDto.password);
  }
}
