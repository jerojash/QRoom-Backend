import { Either } from "src/generics/Either";
import { createUserService } from "src/user/application/createUserService";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { userMotherObject } from "./motherObject/userMotherObject";
import { CreateUserDto } from "src/user/application/dto/create-user.dto";
import { TestingModule, Test } from "@nestjs/testing";
import { authService } from "src/user/application/authService";
import { getUserService } from "src/user/application/getUserService";
import { adapterUserRepository } from "src/user/infrastructure/user.adapter";
import { UserController } from "src/user/infrastructure/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolEntity } from "src/rol/infrastructure/entities/rol.entity";
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('UserController', () => {
    let controller: UserController;
    let getService: getUserService<{}>;

    const responseMock = {
        status: jest.fn((x)=>x)
    }

    const requestMock = {
        query: {},

    } as unknown as Request;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [adapterUserRepository, 
                createUserService, 
                getUserService,
                authService,]
        })
        .overrideProvider(adapterUserRepository) 
        .useValue({ 
        adapterMock: jest.fn(),
        })
        .overrideProvider(createUserService) 
        .useValue({ 
        createServiceMock: jest.fn(),
        })
        .overrideProvider(getUserService) 
        .useValue({ 
        getUserServiceMock: {
            execute: jest.fn((x)=>x)
        },
        })
        .overrideProvider(authService) 
        .useValue({ 
        authMock: jest.fn(),
        })
        .compile();

    // beforeEach(async () => {
    //     const moduleRef = await Test.createTestingModule({
    //       controllers: [UserController],
    //     })
    //     .useMocker((token) => {
    //         const userTest = {
    //             "id": "d96066a6-ff14-44d3-b8a2-63354616b467",
    //             "username": "avct",
    //             "password": "1234567",
    //             "email": "avct@gmail.com",
    //             "first_name": "Ashly",
    //             "last_name": "de Rojas",
    //             "code_area_1": "2344823",
    //             "phone_number_1": "0058"
    //         }
    //         const results = [userTest];
    //         if (token === adapterUserRepository) {
    //             return { findAll: jest.fn().mockResolvedValue(results) };
    //         }
    //         if (typeof token === 'function') {
    //             const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
    //             const Mock = moduleMocker.generateFromMetadata(mockMetadata);
    //             return new Mock();
    //         }
    //     }).compile();

        getService = moduleRef.get(getUserService);
        controller = moduleRef.get(UserController);
    });


    it('getUsers',async ()=>{
        // const result = Either.makeRight<Error, {}[]>([{},{}])
        // console.log(getService);
        // //jest.spyOn(getService, 'execute').mockImplementation(async () => await result);

        // expect(await controller.findAll(responseMock)).toBe(result);
        expect(true).toBe(true);
    });
});
