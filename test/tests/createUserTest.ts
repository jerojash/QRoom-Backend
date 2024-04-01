import { Either } from "src/generics/Either";
import { createUserService } from "src/user/application/createUserService";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { userMotherObject } from "./motherObject/userMotherObject";
import { CreateUserDto } from "src/user/application/dto/create-user.dto";


describe('createUserService', () => {
    test('test_create_user_valid', async () => {
        //Arrange
        const createUserService: createUserService<UserEntity> =
            userMotherObject.createUserService();
        const dto: CreateUserDto = userMotherObject.createUserWithCodeAndPhone();

        //Act
        const result: Either<Error, UserEntity> = await createUserService.execute(dto);

        //Assert
        expect(result.isRight()).toBeTruthy();
    });
});