import { v4 as uuid}  from "uuid";

export class AreaId{
    constructor(
        private id?: string
    ){
        if(id===undefined) this.id = uuid();
        else this.id = id;
    }

    getIdArea(): string{
        return this.id;
    }

    static create(id?: string): AreaId{
        return new AreaId(id);
    }
}