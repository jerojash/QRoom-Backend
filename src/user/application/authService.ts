import { Either } from "src/generics/Either";
import { IUser } from "../domain/repository/IUser";
import { AuthUserDto } from "./dto/auth-user.dto";

export class authService<T> {
    private UserRepository: IUser<T>;
    constructor(repo: IUser<T>) {
        this.UserRepository = repo;
    }
    async execute(authDto: AuthUserDto): Promise<Either<Error,T>>{
        return this.UserRepository.authUser(authDto.email, authDto.password)
    }
}