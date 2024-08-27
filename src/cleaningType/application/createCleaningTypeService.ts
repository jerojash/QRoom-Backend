import { Either } from "src/generics/Either";
import { ICleaningType } from "../domain/repository/ICleaningType";
import { CreateCleaningTypeDto } from "./dto/create-cleaning-type.dto";
import { CleaningType } from "../domain/cleaningType";

export class createCleaningTypeService<T>{
    private CleaningTypeRepository: ICleaningType<T>;
    constructor(repo: ICleaningType<T>) {
        this.CleaningTypeRepository = repo;
    }
    async execute(dto: CreateCleaningTypeDto ): Promise<Either<Error,T>>{

        const cleaningType = CleaningType.create(dto.name, dto.description);

        let result = this.CleaningTypeRepository.createCleaningType(cleaningType);
        return result
    }

}