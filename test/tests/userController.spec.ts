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
                { // <- otro proveedor
                    provide: getUserService<{UserEntity}>,
                    useValue: {
                      execute: jest.fn().mockImplementation(() => {  // <- reemplazo el modelo con un mock
                        return jest.fn(); // <- findOne necesita retornar el exec
                      }),
                    },
                },
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
        // .overrideProvider(getUserService) 
        // .useValue({
        //         execute: jest.fn(),
        // })
        .overrideProvider(authService) 
        .useValue({ 
        authMock: jest.fn(),
        })
        .compile();

        getService = moduleRef.get<getUserService<UserEntity>>(getUserService);
        controller = moduleRef.get(UserController);
    });

    describe('Should', ()=>{
        it('getUsers',async ()=>{
            const result = Either.makeRight<Error, string[]>(['user1','user2'])
            // console.log(getService.execute);
            const spy = jest.spyOn(getService, 'execute')//.mockImplementation(async () => await result);
    
            await getService.execute();
            expect(spy).toBeCalledTimes(1);
            // expect(true).toBe(true);
        });
    })


    
});
