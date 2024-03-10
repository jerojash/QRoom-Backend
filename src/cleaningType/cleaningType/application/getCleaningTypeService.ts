import { Either } from "src/generics/Either";
import { ICleaningType } from "../domain/repository/ICleaningType";

export class getCleaningTypeService<T> {
    private cleaningTypeRepository: ICleaningType<T>;
    constructor(repo: ICleaningType<T>){
        this.cleaningTypeRepository = repo
    }
    async execute(): Promise<Either<Error,T[]>>{
        return this.cleaningTypeRepository.getCleaningType();
    }
}