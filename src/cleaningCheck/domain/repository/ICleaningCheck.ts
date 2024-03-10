import { Either } from "src/generics/Either";
import { CleaningCheck } from "../cleaningCheck";

export interface ICleaningCheck<T>{
    getCleaningCheck(): Promise<Either<Error,T[]>>;
    createCleaningCheck( cleaningCheck: CleaningCheck): Promise<Either<Error,T>>
}