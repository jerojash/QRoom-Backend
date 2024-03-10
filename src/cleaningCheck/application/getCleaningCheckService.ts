import { Either } from "src/generics/Either";
import { ICleaningCheck } from "../domain/repository/ICleaningCheck";

export class getCleaningCheckService<T> {
    private cleaningCheckRepository: ICleaningCheck<T>;
    constructor(repo: ICleaningCheck<T>){
        this.cleaningCheckRepository = repo
    }
    async execute(): Promise<Either<Error,T[]>>{
        return this.cleaningCheckRepository.getCleaningCheck();
    }
}