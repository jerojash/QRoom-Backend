import { CleaningTypeDescription } from "./valueObjects/CleaningTypeDescription";
import { CleaningTypeId } from "./valueObjects/CleaningTypeId";
import { CleaningTypeName } from "./valueObjects/CleaningTypeName";
import { CleaningTypeOrder } from "./valueObjects/CleaningTypeOrder";

export class CleaningType {
    constructor(
        private name: CleaningTypeName,
        private order: CleaningTypeOrder,
        private description: CleaningTypeDescription,
        private id?: CleaningTypeId
        
    ){}

    getName(): CleaningTypeName {
        return this.name;
    };

    getDescription(): CleaningTypeDescription {
        return this.description;
    };

    getOrder(): CleaningTypeOrder {
        return this.order;
    };

    getId(): CleaningTypeId {
        return this.id;
    }

    static create(name: string, order: number, description?: string, id?: string){
        return new CleaningType(new CleaningTypeName(name), new CleaningTypeOrder(order),
        new CleaningTypeDescription(description), new CleaningTypeId(id))
    }
}