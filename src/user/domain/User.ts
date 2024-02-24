import { Either } from "src/generics/Either";
import { UserCredential } from "./valueObjects/UserCredential";
import { UserFullName } from "./valueObjects/UserFullName";
import { UserPhoneNumber } from "./valueObjects/UserPhoneNumber";
import { UserId } from "./valueObjects/UserId";

export class User{
    private constructor(
        private credentials: UserCredential,
        private names: UserFullName,
        private phone_number: UserPhoneNumber,
        private id?: UserId|undefined
    ){}

    public getCredentials(): UserCredential{
        return this.credentials;
    }
    
    public getNames(): UserFullName{
        return this.names;
    }

    public getPhoneNumber(): UserPhoneNumber{
        return this.phone_number;
    }

    public getId(): UserId|undefined {
        return this.id;
    }

    static create(username: string, password: string, email: string, first_name: string, 
        last_name: string, code_area_1: string, phone_number_1: 
        string, id?: string): Either<string,User>{
            const credencialAux = UserCredential.create(username,password,email);

            if(credencialAux.isLeft()) return Either.makeLeft<string,User>(credencialAux.getLeft());

            return Either.makeRight<string,User>(new User(
                credencialAux.getRight(), new UserFullName(first_name,last_name),
                new UserPhoneNumber(code_area_1, phone_number_1)))
    }
}