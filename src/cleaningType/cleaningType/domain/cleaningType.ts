import { CleaningTypeDescription } from "./valueObjects/CleaningTypeDescription";
import { CleaningTypeId } from "./valueObjects/CleaningTypeId";
import { CleaningTypeName } from "./valueObjects/CleaningTypeName";

export class cleaningType {
    constructor(
        private name: CleaningTypeName,
        private description: CleaningTypeDescription,
        private id?: CleaningTypeId
        
    ){}
}