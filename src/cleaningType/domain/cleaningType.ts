import { CleaningTypeDescription } from "./valueObjects/CleaningTypeDescription";
import { CleaningTypeId } from "./valueObjects/CleaningTypeId";
import { CleaningTypeName } from "./valueObjects/CleaningTypeName";

export class CleaningType {
    constructor(
        private name: CleaningTypeName,
        private id?: CleaningTypeId
        
    ){}

    getName(): CleaningTypeName {
        return this.name;
    };

    getId(): CleaningTypeId {
        return this.id;
    }

    static create(name: string, id?: string){
        return new CleaningType(new CleaningTypeName(name), new CleaningTypeId(id))
    }
}