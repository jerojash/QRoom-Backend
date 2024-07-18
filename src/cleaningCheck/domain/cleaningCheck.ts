
import { CleaningCheckId } from "./valueObjects/CleaningCheckId";
import { CleaningCheckName } from "./valueObjects/CleaningCheckName";
import { CleaningTypeId } from "./valueObjects/CleaningTypeId";

export class CleaningCheck {
    constructor(
        private name: CleaningCheckName,
        private id_cleaning_type?: CleaningTypeId,
        private id_parent_task?: CleaningCheckId,
        private id?: CleaningCheckId
        
    ){}

    getName(): CleaningCheckName {
        return this.name;
    };

    getTypeId(): CleaningTypeId {
        return this.id_cleaning_type;
    }
    
    getId(): CleaningCheckId {
        return this.id;
    }

    getParentTaskId(): CleaningCheckId {
        return this.id_parent_task;
    }

    static create(name: string, id_type: string, 
        id_sub_task: string, id?: string){
        return new CleaningCheck(new CleaningCheckName(name),
        new CleaningTypeId(id_type), new CleaningCheckId(id_sub_task), 
        new CleaningCheckId(id))
    }
}