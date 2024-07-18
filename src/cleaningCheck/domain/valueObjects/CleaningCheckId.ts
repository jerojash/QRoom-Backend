import {v4 as uuid} from "uuid";
export class CleaningCheckId {
    constructor(
        private id?: string
    ){
        this.id = id;
    }

    getId(): string{
        return this.id;
    }

}