import { Either } from "src/generics/Either";
import { createUserService } from "src/user/application/createUserService";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { userMotherObject } from "./motherObject/userMotherObject";
import { CreateUserDto } from "src/user/application/dto/create-user.dto";

describe('createUserDomain', () => {
    test('test_create_user_with_phone', async () => {
        //Arrange
        const createUserService: createUserService<UserEntity> =
            userMotherObject.createUserService();
        const dto: CreateUserDto = userMotherObject.createUserWithCodeAndPhone();

        //Act
        const result: Either<Error, UserEntity> = await createUserService.execute(dto);

        //Assert
        expect(result.isRight()).toBeTruthy();
    });

    it('test_create_user_without_phone', async () => {
        //Arrange
        const createUserService: createUserService<UserEntity> =
            userMotherObject.createUserService();
        const dto: CreateUserDto = userMotherObject.createUserWithoutCodeAndPhone();

        //Act
        const result: Either<Error, UserEntity> = await createUserService.execute(dto);

        //Assert
        expect(result.isRight()).toBeTruthy();
    });

    it('test_create_user_with_email_invalid', async () => {
        //Arrange
        const createUserService: createUserService<UserEntity> =
            userMotherObject.createUserService();
        const dto: CreateUserDto = userMotherObject.createUserWithEmailInvalid();

        //Act
        const result: Either<Error, UserEntity> = await createUserService.execute(dto);

        //Assert
        expect(result.isLeft()).toBeTruthy();
    });
});
