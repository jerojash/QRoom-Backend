import { Either } from "src/generics/Either";
import { UserCredential } from "./valueObjects/UserCredential";
import { UserFullName } from "./valueObjects/UserFullName";
import { UserPhoneNumber } from "./valueObjects/UserPhoneNumber";
import { UserId } from "./valueObjects/UserId";

export class Usuario{
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
  
}