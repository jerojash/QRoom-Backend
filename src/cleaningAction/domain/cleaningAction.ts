import { CleaningTypeId } from "src/cleaningType/domain/valueObjects/CleaningTypeId";
import { RoomId } from "src/room/domain/valueObjects/RoomId";
import { UserId } from "src/user/domain/valueObjects/UserId";
import { InitialTimeHk } from "./valueObjects/InitialTimeHk";
import { InitialTimeSup } from "./valueObjects/InitialTimeSup";
import { CleaningActionId } from "./valueObjects/CleaningActionId";

export class CleaningAction {

    constructor(
        private id: CleaningActionId,
        private id_room?: RoomId,
        private id_house_keeper?: UserId,
        private id_cleaning_type?: CleaningTypeId,
        private initial_time_hk?: InitialTimeHk,
        private id_supervisor?: UserId,
        private initial_time_sup?: InitialTimeSup
    ){}

    getCleaningActionId(): CleaningActionId {
        return this.id;
    }

    getCleaningActionIdRoom(): RoomId {
        return this.id_room;
    }

    getCleaningActionIdHk(): UserId {
        return this.id_house_keeper
    }
}