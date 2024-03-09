import { Either } from "src/generics/Either";

export class UserCredential{
    private constructor(
        public username: string,
        public password: string,
        public email: string
    ){}

    getUserName(): string{
        return this.username
    }

    getPassword(): string{
        return this.password
    }

    getEmail(): string{
        return this.email
    }

    public emailValidation():Boolean{
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(this.email);
    }

    public passwordValidation(): Boolean{
        const expression: RegExp = /^(?=.*\d)(?=.*[-_!@#$%^&*?.])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return expression.test(this.password);
    }

    public credentialsValidation(): Boolean{
        return this.emailValidation() //&& this.passwordValidation()
    }

    public static create(username, clave, email): Either<string, UserCredential>{
        const credenciales: UserCredential = 
            new UserCredential(username,clave,email)
        
        //Es verdadero si todas las credenciales estan bien
        if(credenciales.credentialsValidation()) return Either.makeRight<string,UserCredential>(credenciales)

        // if(!credenciales.passwordValidation()){
        //     return Either.makeLeft<string,UserCredential>('La clave ingresada es incorrecta')
        // } 
        return Either.makeLeft<string,UserCredential>('Se ha ingresado un correo invalido')
    }
}