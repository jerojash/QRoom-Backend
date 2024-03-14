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
import { join } from 'path';
const PDFDocument = require('pdfkit-table');
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

  async exportPdf(): Promise<Buffer> {

    const pdfBuffer: Buffer = await new Promise( resolve => {
      const doc = new PDFDocument(
        {
          size: "LETTER",
          bufferPages: true,
          autoFirstPage: false
        })

        let pageNumber = 0;
        doc.on('pageAdded', ()=>{
          pageNumber++;

          if (pageNumber > 1){
            doc.image(join(process.cwd(), "upload/logo.png"), doc.page.width - 100, 5, {fit: [45,45], align: 'center'})
            doc.moveTo(50, 55)
            .lineTo(doc.page.width - 50, 55)
            .stroke(); 
          }

          let bottom = doc.page.margins.bottom;

          doc.page.margins.bottom = 0
          doc.text(
            'Pag. '+pageNumber,
            (doc.page.width - 100)/2,
            doc.page.height - 50,
            {
              width: 100,
              align: 'center',
              lineBreak: false,
            }
          )

          doc.page.margins.bottom = bottom;

        }
        )

        doc.addPage();
        doc.image(join(process.cwd(), "upload/logo.png"), doc.page.width/2 - 100, 150, {width: 200,})
        doc.text('',0,400);
        doc.font("Helvetica-Bold").fontSize(24);
        doc.text("QRoom",{
          width: doc.page.width,
          align: 'center'
        });

        doc.addPage();
        doc.text("",60,60)
        doc.font("Helvetica").fontSize(12);
        doc.text("Children's Hospital Los Angeles",{
          align: 'center'
        });
        doc.font("Helvetica-Bold").fontSize(12);
        doc.text("Operating or Procedure Room Terminal Cleaning Log",{
          align: 'center'
        });

        //Create table
        const table = {
          title: "Cleaning",
          subtitle: "QRoom",
          headers: ["id", "name"],//Columns headers
          rows: [["1","Javier"], ["2","Pedro"]] 
        };

        doc.table(table, {columnSize:[150,300]})



        const buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', ()=>{
          const data = Buffer.concat(buffer);
          resolve(data);
        })
        doc.end();
    })

    return pdfBuffer;
  }
  
}
