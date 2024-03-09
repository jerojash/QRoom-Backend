import { Either } from "src/generics/Either";
import { Room } from "../room";

export interface IRoom<T>{
    createRoom(room: Room): Promise<Either<Error,T>>;
    getRooms(room: Room): Promise<Either<Error, T[]>>;
    getRoomById(id: string): Promise<Either<Error, T>>;
}