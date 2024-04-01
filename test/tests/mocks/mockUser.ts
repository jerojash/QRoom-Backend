import { Either } from "src/generics/Either";
import { IUser } from "src/user/domain/repository/IUser";
import { User } from "src/user/domain/User";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";

export class mockUser implements IUser<UserEntity>{
    userRegister(user: User): Promise<Either<Error, UserEntity>>{
        let username = user.getCredentials().credentialsValidation()
        if(username) return Promise.resolve(Either.makeRight<Error, UserEntity>(new UserEntity()));
        return Promise.resolve(Either.makeLeft<Error, UserEntity>(new Error("Error al registrar usuario")));
    }
    getUsers(): Promise<Either<Error, UserEntity[]>> {
        throw new Error("Method not implemented.");
    }

    authUser(email: string, password: string): Promise<Either<Error, UserEntity>> {
        throw new Error("Method not implemented.");
    }

}