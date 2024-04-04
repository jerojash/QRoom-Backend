import { createUserService } from "src/user/application/createUserService";
import { CreateUserDto } from "src/user/application/dto/create-user.dto";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { mockUser } from "../mocks/mockUser";

export class userMotherObject {
    public static createUserWithCodeAndPhone(): CreateUserDto {
        let username = "jerojash";
        let password = "123ClaveValida123*"
        let email = "email@gmail.com";
        let first_name = "Javier Eduardo";
        let last_name = "Rojas Hernandez";
        let code_area_1 = "+58";
        let phone_number_1 = "4267653412";
        const dto = new CreateUserDto(username, password, email, first_name,
            last_name, code_area_1, phone_number_1);
        return dto;
    }
    public static createUserWithoutCodeAndPhone(): CreateUserDto {
        let username = "jerojash";
        let password = "123ClaveValida123*"
        let email = "email@gmail.com";
        let first_name = "Javier Eduardo";
        let last_name = "Rojas Hernandez";
        let code_area_1 = "+58";
        let phone_number_1 = "4267653412";
        const dto = new CreateUserDto(username, password, email, first_name,
            last_name, code_area_1, phone_number_1);
        return dto;
    }
    public static createUserWithEmailInvalid(): CreateUserDto {
        let username = "jerojash";
        let password = "123ClaveValida123*"
        let email = "email@gmailcom";
        let first_name = "Javier Eduardo";
        let last_name = "Rojas Hernandez";
        let code_area_1 = "+58";
        let phone_number_1 = "4267653412";
        const dto = new CreateUserDto(username, password, email, first_name,
            last_name, code_area_1, phone_number_1);
        return dto;
    }

    public static createUserService(): createUserService<UserEntity> {
        const mock: mockUser = new mockUser();
        const service = new createUserService(mock);
        return service
    }
}