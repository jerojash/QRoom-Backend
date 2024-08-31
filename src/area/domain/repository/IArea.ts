import { Either } from "src/generics/Either";
import { Area } from "../area";

export interface IArea<T>{
    createArea(area: Area): Promise<Either<Error,T>>;
    getAreas(): Promise<Either<Error, T[]>>;
}