import { Either } from "../../../generics/Either";
import { Rol } from "../Rol";


export interface IRol<T>{
   createRol(rol: Rol): Promise<Either<Error, T>>
   getRoles(): Promise<Either<Error, T[]>>
}