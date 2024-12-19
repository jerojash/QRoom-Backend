import { Either } from 'src/generics/Either';
import { IUser } from '../domain/repository/IUser';
import { SendEmailDto } from './dto/send-email.dto';

export class sendEmailPasswordRecoveryService<T> {
  private UserRepository: IUser<T>;
  constructor(repo: IUser<T>) {
    this.UserRepository = repo;
  }
  async execute(
    sendEmailPasswordRecoveryDto: SendEmailDto
  ): Promise<Either<Error, string>> {
    return this.UserRepository.sendEmailPasswordRecovery(
      sendEmailPasswordRecoveryDto.email
    );
  }
}
