import { Either } from "src/generics/Either";
import { CreateRoomDto } from "./dto/create-room.dto";
import { IRoom } from "../domain/repository/IRoom";
import { Room } from "../domain/room";

export class createRoomService<T>{

    private RoomRepository: IRoom<T>;
    constructor(repo: IRoom<T>) {
        this.RoomRepository = repo;
    }

    async execute(dto: CreateRoomDto): Promise<Either<Error,T>>{
        
        const room = Room.create(dto.name, dto.area);

        const result = this.RoomRepository.createRoom(room);
        return result
    }
}