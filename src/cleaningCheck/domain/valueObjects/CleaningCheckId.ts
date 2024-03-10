import {v4 as uuid} from "uuid";

export class CleaningCheckId {
    constructor(
        private id?: string
    ){
        if(id===undefined) this.id = uuid();
        else this.id = id;
    }

    getId(): string{
        return this.id;
    }

    static create(id?: string): CleaningCheckId{
        return new CleaningCheckId(id);
    }
}