import { Either } from "src/generics/Either";
import { IRoom } from "../domain/repository/IRoom";

export class getRoomByIdService <T> {
    private RoomRepository: IRoom<T>;
    constructor(repo: IRoom<T>) {
        this.RoomRepository = repo;
    }
    async execute(id: string, userRol: string): Promise<Either<Error,T>>{
        return this.RoomRepository.getRoomById(id, userRol)
    }
}