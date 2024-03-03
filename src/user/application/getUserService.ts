import { Either } from "src/generics/Either";
import { IUser } from "../domain/repository/IUser";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "../domain/User";

export class getUserService<T>{
    private UserRepository: IUser<T>;
    constructor(repo: IUser<T>) {
        this.UserRepository = repo;
    }
    async execute(id: string): Promise<Either<Error,T[]>>{
        return this.UserRepository.getUsers(id)
    }

}