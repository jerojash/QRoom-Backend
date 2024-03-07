import { RoomArea } from "./valueObjects/RoomArea";
import { RoomId } from "./valueObjects/RoomId";
import { RoomName } from "./valueObjects/RoomName";

export class Room{

    private constructor(
        private area: RoomArea,
        private name: RoomName,
        private id?: RoomId
    ){}

    public getIdRoom(): RoomId {
        return this.id;
    }

    public getName(): RoomName {
        return this.name;
    }

    public getArea(): RoomArea {
        return this.area;
    }

    static create(name: string, area: string, id?: string){
        return new Room( new RoomArea(area), new RoomName(name), new RoomId(id))
    }
}