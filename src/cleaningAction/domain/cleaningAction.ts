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

    getCleaningType(): CleaningTypeId {
        return this.id_cleaning_type
    }

    getCleaningInitTimeHk(): InitialTimeHk {
        return this.initial_time_hk
    }

    getCleaningIdSupervisor(): UserId {
        return this.id_supervisor
    }

    getCleaningInitTimeSuper():  InitialTimeSup{
        return this.initial_time_sup
    }

    public static create(id: string, id_room: string, id_hk, id_cleaning_type,
        init_time_hk: string, id_sup: string, init_time_sup: string)
    {
        return new CleaningAction(new CleaningActionId(id),
        new RoomId(id_room), new UserId(id_hk), 
        new CleaningTypeId(id_cleaning_type),
        new InitialTimeHk(init_time_hk), new UserId(id_sup), 
        new InitialTimeSup(init_time_sup));
    }
}