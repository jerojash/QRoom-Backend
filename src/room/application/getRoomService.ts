import { Either } from "src/generics/Either";
import { IRoom } from "../domain/repository/IRoom";

export class getRoomsService <T> {
    private RoomRepository: IRoom<T>;
    constructor(repo: IRoom<T>) {
        this.RoomRepository = repo;
    }
    async execute(): Promise<Either<Error,T[]>>{
        return this.RoomRepository.getRooms()
    }
}