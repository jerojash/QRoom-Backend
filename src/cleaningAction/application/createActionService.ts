import { Either } from "src/generics/Either";
import { ICleaningAction } from "../domain/repository/ICleaningAction";
import { CreateCleaningActionDto } from "./dto/create-cleaning-action.dto";
import { CleaningAction } from "../domain/cleaningAction";

export class createActionService {
    private CleaningActionRepository: ICleaningAction;
    constructor(repo: ICleaningAction) {
        this.CleaningActionRepository = repo;
    }
    async execute(dto: CreateCleaningActionDto ): Promise<Either<Error,string>>{

        let cleaningAction;

        if(dto.user_rol === 'HK') {
            cleaningAction = CleaningAction.create(dto.id_room,dto.id_user,dto.id_cleaning_type,
                dto.time);
        } else {
            cleaningAction = CleaningAction.create(dto.id_room,undefined, undefined, undefined,
                dto.id_user, dto.time, dto.id_cleaning_action);
        }
        
        let result = this.CleaningActionRepository.createCleaningAction(cleaningAction);
        return result
    }
}