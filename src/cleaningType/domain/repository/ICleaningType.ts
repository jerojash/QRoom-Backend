import { Either } from "src/generics/Either";
import { CleaningType } from "../cleaningType";

export interface ICleaningType<T>{
    getCleaningType(): Promise<Either<Error,T[]>>;
    createCleaningType( cleaningType: CleaningType): Promise<Either<Error,T>>
}