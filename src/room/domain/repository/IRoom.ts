import { Either } from "src/generics/Either";
import { Room } from "../room";

export interface IRoom<T>{
    createRoom(room: Room): Either<Error,T>;
    getRooms(room: Room): Either<Error, T[]>;
    getRoomById(id: string): Either<Error, T>;
}