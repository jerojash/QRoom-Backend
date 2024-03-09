import { Either } from "src/generics/Either";

export interface ICleaningType<T>{
    getCleaningType(): Promise<Either<Error,T>>;
    createCleaningType(): Promise<Either<Error,T>>;
}