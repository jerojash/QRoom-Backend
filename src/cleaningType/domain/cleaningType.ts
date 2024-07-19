import { CleaningTypeDescription } from "./valueObjects/CleaningTypeDescription";
import { CleaningTypeId } from "./valueObjects/CleaningTypeId";
import { CleaningTypeName } from "./valueObjects/CleaningTypeName";
import { RoomId } from "./valueObjects/RoomId";

export class CleaningType {
    constructor(
        private name: CleaningTypeName,
        private idRoom?: RoomId,
        private id?: CleaningTypeId
        
    ){}

    getName(): CleaningTypeName {
        return this.name;
    };

    getIdRoom(): RoomId {
        return this.idRoom;
    }

    getId(): CleaningTypeId {
        return this.id;
    }

    static create(name: string, id_room?: string, id?: string){
        return new CleaningType(new CleaningTypeName(name), new RoomId(id_room), new CleaningTypeId(id))
    }
}