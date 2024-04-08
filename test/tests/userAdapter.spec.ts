import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { RolEntity } from "src/rol/infrastructure/entities/rol.entity";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { adapterUserRepository } from "src/user/infrastructure/user.adapter";
import { Repository } from "typeorm";

describe('AdapterUserRepository', () => {
    let adapterRepo: adapterUserRepository;
    let repository: Repository<UserEntity> // <- necesario para espiarlo
    let repositoryRol: Repository<RolEntity>
    
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [
          adapterUserRepository,
          { // <- otro proveedor
            provide: getRepositoryToken(UserEntity),
            useValue: {
              findOne: jest.fn().mockImplementation(() => {  // <- reemplazo el modelo con un mock
                return jest.fn(); // <- findOne necesita retornar el exec
              }),
            },
          },
          { // <- otro proveedor
            provide: getRepositoryToken(RolEntity),
            useValue: {
              find: jest.fn().mockImplementation(() => {  // <- reemplazo el modelo con un mock
                return jest.fn(); // <- findOne necesita retornar el exec
              }),
            },
          },
        ],
      }).compile();
  
      adapterRepo = app.get<adapterUserRepository>(adapterUserRepository);
      // Ya que injecte la depenencia arriba, puedo obtenerlo mediante el get
      repository = app.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
      repositoryRol = app.get<Repository<RolEntity>>(getRepositoryToken(RolEntity));
    });
  
    describe('root', () => {
      it('should 1 equal 1', () => {
        expect(1).toBe(1);
      });
    });

    describe('Should findOne', () => {
        it('called one time', async () => {
          // Preparamos el espia del findOne
          const spyFindOne = jest.spyOn(repository, 'findOne');
          // Ejecutamos la funcion authUser
          await adapterRepo.authUser('','');
          // Valido que el findOne se llame solo una vez
          expect(spyFindOne).toBeCalledTimes(1);
        });
        it('called with correct arguments', async () => {
          // Preparamos el argumento
          const email = 'test@email.com'
          const password = 'pass123123'
          // Preparamos el espia del findOne
          const spyFindOne = jest.spyOn(repository, 'findOne');
          // Ejecutamos la funcion authUser
          await adapterRepo.authUser(email,password);
          // Valido que el findOne se llame solo una vez
          expect(spyFindOne).toBeCalledWith({
            where:{email:email,
            password:password},
            relations:{
              rol:true
            },
          });
          
        });
      });
});
