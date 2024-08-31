import { AreaId } from "./valueObjects/AreaId";
import { AreaName } from "./valueObjects/AreaName";

export class Area {
    constructor (
        private name: AreaName,
        private id?: AreaId
    )
    {}

    public getIdArea(): AreaId {
        return this.id;
    }

    public getName(): AreaName {
        return this.name;
    }

    static create(name: string, id?: string){
        return new Area( new AreaName(name), new AreaId(id))
    }

    
}