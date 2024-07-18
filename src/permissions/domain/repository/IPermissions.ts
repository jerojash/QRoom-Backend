import { Either } from "../../../generics/Either";
import { Permissions } from "../Permissions";


export interface IPermissions{
   createPermissions(permissions: Permissions): Promise<Either<Error, string>>
   // getPermissions(): Promise<Either<Error, T[]>>
}