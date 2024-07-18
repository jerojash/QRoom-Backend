import {v4 as uuid} from "uuid";

export class CleaningTypeId {
    constructor(
        private id?: string
    ){
        this.id = id;
    }

    getId(): string{
        return this.id;
    }

}