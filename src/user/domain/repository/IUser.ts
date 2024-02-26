
import { Either } from "../../../generics/Either";
import { User } from "../User";


export interface IUser<T>{
   userRegister(usuario: User): Promise<Either<Error, T>>
}