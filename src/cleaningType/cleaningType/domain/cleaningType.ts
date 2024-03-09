import { CleaningTypeDescription } from "./valueObjects/CleaningTypeDescription";
import { CleaningTypeId } from "./valueObjects/CleaningTypeId";
import { CleaningTypeName } from "./valueObjects/CleaningTypeName";

export class CleaningType {
    constructor(
        private name: CleaningTypeName,
        private description: CleaningTypeDescription,
        private id?: CleaningTypeId
        
    ){}

    getName(): CleaningTypeName {
        return this.name;
    };

    getDescription(): CleaningTypeDescription {
        return this.description;
    }

    getId(): CleaningTypeId {
        return this.id;
    }

    static create(name: string, description: string, id?: string){
        return new CleaningType(new CleaningTypeName(name), 
        new CleaningTypeDescription(description) ,new CleaningTypeId(id))
    }
}