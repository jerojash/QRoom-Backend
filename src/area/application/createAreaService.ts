import { Either } from "src/generics/Either";
import { CreateAreaDto } from "./dto/create-area.dto";
import { IArea } from "../domain/repository/IArea";
import { Area } from "../domain/area";

export class createAreaService<T>{

    private AreaRepository: IArea<T>;
    constructor(repo: IArea<T>) {
        this.AreaRepository = repo;
    }

    async execute(dto: CreateAreaDto): Promise<Either<Error,T>>{
        
        const area = Area.create(dto.name);

        const result = this.AreaRepository.createArea(area);
        return result
    }
}