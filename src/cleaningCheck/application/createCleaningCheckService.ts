import { Either } from "src/generics/Either";
import { ICleaningCheck } from "../domain/repository/ICleaningCheck";
import { CreateCleaningCheckDto } from "./dto/create-cleaning-check.dto";
import { CleaningCheck } from "../domain/cleaningCheck";

export class createCleaningCheckService<T>{
    private CleaningCheckRepository: ICleaningCheck<T>;
    constructor(repo: ICleaningCheck<T>) {
        this.CleaningCheckRepository = repo;
    }
    async execute(dto: CreateCleaningCheckDto ): Promise<Either<Error,T>>{

        const cleaningCheck = CleaningCheck.create(dto.name, dto.description, dto.type_id);

        let result = this.CleaningCheckRepository.createCleaningCheck(cleaningCheck);
        return result
    }

}