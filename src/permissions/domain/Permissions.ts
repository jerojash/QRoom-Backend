import { RolId } from "src/rol/domain/valueObjects/RolId";
import { RoomId } from "src/room/domain/valueObjects/RoomId";
import { PermissionsId } from "./valueObjects/PermissionsId";
import { Either } from "src/generics/Either";

export class Permissions{
    private constructor(
        private id_rol: RolId,
        private id_room: RoomId,
        private id?: PermissionsId|undefined
    ){}

    public getIdRol(): RolId{
        return this.id_rol;
    }
    
    public getIdRoom(): RoomId{
        return this.id_room;
    }

    public getId(): PermissionsId|undefined {
        return this.id;
    }

    static create(id_room: string, id_rol: string, id?: string): Either<string,Permissions>{
            
            let idPermissions: PermissionsId;
            if(id === undefined){
                idPermissions = PermissionsId.create();
            }else{
                idPermissions = PermissionsId.create(id);
            }

            return Either.makeRight<string,Permissions>
            (new Permissions(new RolId(id_rol), new RoomId(id_room), idPermissions));
    }
}