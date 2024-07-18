import { Either } from "src/generics/Either";
import { IPermissions } from "../domain/repository/IPermissions";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { Permissions } from "../domain/Permissions";

export class CreatePermissionsService{
    private PermissionsRepository: IPermissions;
    constructor(repo: IPermissions) {
        this.PermissionsRepository = repo;
    }
    async execute(dto: CreatePermissionDto): Promise<Either<Error,string>>{

        const permissions = Permissions.create(dto.id_room, dto.id_rol)

        let result = this.PermissionsRepository.createPermissions(permissions.getRight());
        return result
    }

}