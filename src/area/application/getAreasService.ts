import { Either } from "src/generics/Either";
import { IArea } from "../domain/repository/IArea";

export class getAreasService <T> {
    private AreaRepository: IArea<T>;
    constructor(repo: IArea<T>) {
        this.AreaRepository = repo;
    }
    async execute(): Promise<Either<Error,T[]>>{
        return this.AreaRepository.getAreas()
    }
}