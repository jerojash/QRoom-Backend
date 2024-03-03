import { Either } from "../../../generics/Either";
import { Rol } from "../Rol";


export interface IUser<T>{
   createRol(rol: Rol): Promise<Either<Error, T>>
   getRoles(): Promise<Either<Error, T[]>>
}