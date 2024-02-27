import { Either } from "src/generics/Either";
import { v4 as uuid}  from "uuid"; 

export class UserId{
    
    
    constructor(
        private id?: string
    ){
        if(id===undefined){
            this.id = uuid();
        }else{
            this.id = id;
        }
    }


    getIDUser(): string{
        return this.id;
    }

    static create(id?: string): UserId{
        return new UserId(id);
    }

    // static addIdTo(id?:string): Either<Error,UserId>{
    //     if(id===undefined) return Either.makeLeft<Error,UserId>(Error("No uuid added"))
    //     else return Either.makeRight<Error,UserId>(new UserId(id))
    // }

}