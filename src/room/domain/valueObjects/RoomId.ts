import { v4 as uuid}  from "uuid";

export class RoomId{
    constructor(
        private id?: string
    ){
        if(id===undefined) this.id = uuid();
        else this.id = id;
    }

    getIdRol(): string{
        return this.id;
    }

    static create(id?: string): RoomId{
        return new RoomId(id);
    }
}

