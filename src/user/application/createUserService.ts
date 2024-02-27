import { Either } from "src/generics/Either";
import { IUser } from "../domain/repository/IUser";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "../domain/User";

export class createUserService<T>{
    private UserRepository: IUser<T>;
    constructor(repo: IUser<T>) {
        this.UserRepository = repo;
    }
    async execute(dto: CreateUserDto): Promise<Either<Error,T>>{

        const usuario = User.create(dto.username,dto.password,dto.email,
            dto.first_name, dto.last_name, dto.phone_number_1, dto.code_area_1)

        if(usuario.isLeft()) return Either.makeLeft<Error,T>(new Error(usuario.getLeft()))
        let result = this.UserRepository.userRegister(usuario.getRight())
        return result
    }

}