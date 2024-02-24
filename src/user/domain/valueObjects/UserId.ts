import { Either } from "src/generics/Either";
import { v4 as uuid}  from "uuid"; 

export class UserId{
    
    
    constructor(
        private id: string
    ){}


    getIDUser(): string{
        return this.id;
    }

    static create(): UserId{
        return new UserId(uuid());
    }

    // static addIdTo(id?:string): Either<Error,UserId>{
    //     if(id===undefined) return Either.makeLeft<Error,UserId>(Error("No uuid added"))
    //     else return Either.makeRight<Error,UserId>(new UserId(id))
    // }

}