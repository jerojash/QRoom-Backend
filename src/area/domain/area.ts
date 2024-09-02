import { AreaId } from "./valueObjects/AreaId";
import { AreaName } from "./valueObjects/AreaName";
import { AreaOrder } from "./valueObjects/AreaOrder";

export class Area {
    constructor (
        private name: AreaName,
        private order: AreaOrder,
        private id?: AreaId
    )
    {}

    public getIdArea(): AreaId {
        return this.id;
    }

    public getName(): AreaName {
        return this.name;
    }

    public getOrder(): AreaOrder {
        return this.order;
    }

    static create(name: string, order: number, id?: string){
        return new Area( new AreaName(name), new AreaOrder(order), new AreaId(id))
    }

    
}