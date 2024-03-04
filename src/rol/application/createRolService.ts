import { Either } from "src/generics/Either";
import { IRol } from "../domain/repository/IRol";
import { CreateRolDto } from "./dto/create-rol.dto";
import { Rol } from "../domain/Rol";

export class createRolService<T>{
    private RolRepository: IRol<T>;
    constructor(repo: IRol<T>) {
        this.RolRepository = repo;
    }
    async execute(dto: CreateRolDto): Promise<Either<Error,T>>{

        const rol = Rol.create(dto.name)

        let result = this.RolRepository.createRol(rol);
        return result
    }

}