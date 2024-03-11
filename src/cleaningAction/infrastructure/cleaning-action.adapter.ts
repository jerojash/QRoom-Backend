import { Injectable } from '@nestjs/common';
import { CreateCleaningActionDto } from '../application/dto/create-cleaning-action.dto';
import { UpdateCleaningActionDto } from '../application/dto/update-cleaning-action.dto';
import { ICleaningAction } from '../domain/repository/ICleaningAction';
import { Either } from 'src/generics/Either';
import { CleaningAction } from '../domain/cleaningAction';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CleaningActionEntity } from './entities/cleaning-action.entity';
import { RoomEntity } from 'src/room/infrastructure/entities/room.entity';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { CleaningTypeEntity } from 'src/cleaningType/infrastructure/entities/cleaning-type.entity';

@Injectable()
export class CleaningActionAdapter implements ICleaningAction{

  constructor(
    @InjectRepository(CleaningActionEntity)
    private readonly repository: Repository<CleaningActionEntity>,
    @InjectRepository(RoomEntity)
    private readonly repoRoom: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private readonly repoUser: Repository<UserEntity>,
    @InjectRepository(CleaningTypeEntity)
    private readonly repoType: Repository<CleaningTypeEntity>
  ){}

  async createCleaningAction(action: CleaningAction): Promise<Either<Error, string>> {
    const cleaningActionToCreate = CleaningActionEntity.create(); 

    try {
      let room = await this.repoRoom.findOne({
        where: {
          id: action.getCleaningActionIdRoom().getIdRoom()
        }
      })
      if (!room) return Either.makeLeft<Error, string>(new Error('Room not found'));

      cleaningActionToCreate.room_ = room;

      let user;

      if(action.getCleaningActionIdHk()){
         user = await this.repoUser.findOne({
          where: {
            id: action.getCleaningActionIdHk().getIDUser()
          }
        })

        cleaningActionToCreate.hk_ = user;

        cleaningActionToCreate.initial_time_hk = action.getCleaningInitTimeHk().getTime();
        
        let cleaning_type  = await this.repoType.findOne({
          where: {
            id: action.getCleaningType().getId()
          }
        })
  
        if(!cleaning_type) return Either.makeLeft<Error, string>(new Error('Cleaning type not found'));
  
        cleaningActionToCreate.cleaning_type_ = cleaning_type;
  
      }else if (action.getCleaningIdSupervisor()) {
          user = await this.repoUser.findOne({
            where: {
              id: action.getCleaningActionIdHk().getIDUser()
            }
          })
  
          cleaningActionToCreate.sup_ = user;
  
          cleaningActionToCreate.initial_time_sup = action.getCleaningInitTimeSuper().getTime();

      } else return Either.makeLeft<Error, string>(new Error('Please insert an id_user_hk or id_user_sup'));

      if(!user) return Either.makeLeft<Error, string>(new Error('User not found'));

      await this.repository.save(cleaningActionToCreate);
      return Either.makeRight<Error, string>('Action registered');
    } catch (error) {
        console.log(error);
        return Either.makeLeft<Error, string>(error);
    }
  }
  
}
