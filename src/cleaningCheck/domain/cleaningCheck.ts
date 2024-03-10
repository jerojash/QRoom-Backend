import { CleaningTypeId } from "src/cleaningType/domain/valueObjects/CleaningTypeId";
import { CleaningCheckDescription } from "./valueObjects/CleaningCheckDescription";
import { CleaningCheckId } from "./valueObjects/CleaningCheckId";
import { CleaningCheckName } from "./valueObjects/CleaningCheckName";

export class CleaningCheck {
    constructor(
        private name: CleaningCheckName,
        private description: CleaningCheckDescription,
        private id_cleaning_type: CleaningTypeId,
        private id?: CleaningCheckId
        
    ){}

    getName(): CleaningCheckName {
        return this.name;
    };

    getDescription(): CleaningCheckDescription {
        return this.description;
    }

    getTypeId(): CleaningTypeId {
        return this.id_cleaning_type;
    }
    
    getId(): CleaningCheckId {
        return this.id;
    }

    static create(name: string, description: string, id_type: string, id?: string){
        return new CleaningCheck(new CleaningCheckName(name), 
        new CleaningCheckDescription(description) ,new CleaningTypeId(id_type), new CleaningCheckId(id))
    }
}