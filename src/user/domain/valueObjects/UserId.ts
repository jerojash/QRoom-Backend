import { Either } from "src/generics/Either";

export class UserId{
    constructor(
        private id: number
    ){}


    getIDUser(): number{
        return this.id;
    }

    static create(id:number): UserId{
        return new UserId(id);
    }

    static addIdTo(id?:number): Either<Error,UserId>{
        if(id===undefined) return Either.makeLeft<Error,UserId>(Error("No se ha ingresado el ID del usuario"))
        else return Either.makeRight<Error,UserId>(new UserId(id))
    }

}