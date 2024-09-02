import { AreaId } from "./valueObjects/AreaId";
import { RoomId } from "./valueObjects/RoomId";
import { RoomName } from "./valueObjects/RoomName";
import { RoomOrder } from "./valueObjects/RoomOrder";

export class Room{

    private constructor(
        private area: AreaId,
        private name: RoomName,
        private order: RoomOrder,
        private id?: RoomId
    ){}

    public getIdRoom(): RoomId {
        return this.id;
    }

    public getName(): RoomName {
        return this.name;
    }

    public getArea(): AreaId {
        return this.area;
    }

    public getOrder(): RoomOrder {
        return this.order;
    }

    static create(name: string, area: string, order: number, id?: string){
        return new Room( new AreaId(area), new RoomName(name), 
        new RoomOrder(order), new RoomId(id))
    }
}