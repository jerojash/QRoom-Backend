import { RolId } from "src/rol/domain/valueObjects/RolId";
import { PermissionsId } from "./valueObjects/PermissionsId";
import { Either } from "src/generics/Either";
import { RoomId } from "./valueObjects/RoomId";
import { CleaningTypeId } from "./valueObjects/CleaningTypeId";

export class Permissions{
    private constructor(
        private id_rol: RolId,
        private id_room: RoomId,
        private id_cleaningType: CleaningTypeId,
        private id?: PermissionsId|undefined
    ){}

    public getIdRol(): RolId{
        return this.id_rol;
    }
    
    public getIdRoom(): RoomId{
        return this.id_room;
    }


    public getIdCleaningType(): CleaningTypeId{
        return this.id_cleaningType;
    }

    public getId(): PermissionsId|undefined {
        return this.id;
    }

    static create(id_rol: string, id_cleaning_type?: string, id_room?: string, id?: string): Either<string,Permissions>{
            
            let idPermissions: PermissionsId;
            if(id === undefined){
                idPermissions = PermissionsId.create();
            }else{
                idPermissions = PermissionsId.create(id);
            }

            return Either.makeRight<string,Permissions>
            (new Permissions(new RolId(id_rol), new RoomId(id_room), 
            new CleaningTypeId(id_cleaning_type), idPermissions));
    }
}