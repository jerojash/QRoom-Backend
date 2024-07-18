import { Either } from "../../../generics/Either";
import { Permissions } from "../Permissions";


export interface IPermissions<T>{
   createPermissions(permissions: Permissions): Promise<Either<Error, T>>
   getPermissions(): Promise<Either<Error, T[]>>
}