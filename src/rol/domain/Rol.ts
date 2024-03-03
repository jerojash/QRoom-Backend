import { RolId } from "./valueObjects/rolId";
import { RolName } from "./valueObjects/rolName";

export class Rol{

    private constructor(
        private name: RolName,
        private id?: RolId
    ){}

    public getIdRol(): RolId {
        return this.id;
    }

    public getName(): RolName {
        return this.name;
    }

    static create(name: string, id?: string){
        return new Rol(new RolName(name), new RolId(id))
    }
}