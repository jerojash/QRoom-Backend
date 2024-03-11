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

        const cleaningCheck = CleaningAction.create(dto.id_room,dto.id_hk,dto.id_cleaning_type,
            dto.time_hk,dto.id_sup,dto.time_sup);

        let result = this.CleaningActionRepository.createCleaningAction(cleaningCheck);
        return result
    }
}