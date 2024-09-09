import { Injectable } from '@nestjs/common';
import { ICleaningAction } from '../domain/repository/ICleaningAction';
import { Either } from 'src/generics/Either';
import { CleaningAction } from '../domain/cleaningAction';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CleaningActionEntity } from './entities/cleaning-action.entity';
import { RoomEntity } from 'src/room/infrastructure/entities/room.entity';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { CleaningTypeEntity } from 'src/cleaningType/infrastructure/entities/cleaning-type.entity';
import { join } from 'path';
import { PrinterService } from 'src/printer/printer.service';
import { getDashboard, getLogByRooms } from 'src/reports';
import { AreaEntity } from 'src/area/infrastructure/entities/area.entity';
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
    private readonly repoType: Repository<CleaningTypeEntity>,
    @InjectRepository(AreaEntity)
    private readonly repoArea: Repository<AreaEntity>,
    private readonly printerService: PrinterService
  ){}

  async getAreasLogDashboard() {
    const areasDashboard1 = await this.repoArea
      .createQueryBuilder('area')
      .leftJoinAndSelect('area.rooms', 'room')
      .leftJoinAndSelect(
        'room.actions',
        'action',
        'action.id = (SELECT a.id FROM cleaning_action a WHERE a.room_id = room.id ORDER BY a.initial_time_hk DESC LIMIT 1)'
      )
      .leftJoinAndSelect('action.hk_', 'hk')
      .leftJoinAndSelect('action.cleaning_type_', 'cleaningType')
      .where('area.name IN (:...names)', { names: ['Main OR', 'SPD'] })
      .orderBy('room.order', 'ASC')
      .getMany();
    
      const areasDashboard3 = await this.repoArea
      .createQueryBuilder('area')
      .leftJoinAndSelect('area.rooms', 'room')
      .leftJoinAndSelect(
        'room.actions',
        'action',
        'action.id = (SELECT a.id FROM cleaning_action a WHERE a.room_id = room.id ORDER BY a.initial_time_hk DESC LIMIT 1)'
      )
      .leftJoinAndSelect('action.hk_', 'hk')
      .leftJoinAndSelect('action.cleaning_type_', 'cleaningType')
      .where('area.name IN (:...names)', 
        { names: 
          ['ASC (Ambulatory Surgical Center)', 
           'PACU', 
           'Hemodialysis', 
           'SPD (Sterile Processing Department)',
           'CATH Lab', 
           'IR (Interventional Radiology)'
          ] })
      .orderBy('room.order', 'ASC')
      .getMany();

      const areasDashboard2 = await this.repoArea
      .createQueryBuilder('area')
      .leftJoinAndSelect('area.rooms', 'room')
      .leftJoinAndSelect(
        'room.actions',
        'action',
        'action.id = (SELECT a.id FROM cleaning_action a WHERE a.room_id = room.id ORDER BY a.initial_time_hk DESC LIMIT 1)'
      )
      .leftJoinAndSelect('action.hk_', 'hk')
      .leftJoinAndSelect('action.cleaning_type_', 'cleaningType')
      .where('area.name IN (:...names)', { names: ['BMT (Bone Marrow Transplant)'] })
      .orderBy('area.order', 'ASC')
      .orderBy('room.order', 'ASC')
      .getMany();

    const docDefinition = getDashboard({
      areasDashboard1,
      areasDashboard2,
      areasDashboard3,
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }


  async getRoomsLog(room_name: string) {
    
    //Get Cleaning Actions by Rooms
    const rooms = await this.repoRoom.find({
      relations: {
        actions: {
          hk_: true,
          cleaning_type_: true,
          sup_: true
        },
        area: true
      },
      order: {
        area: {
          order: 'ASC'
        },
        order: 'ASC',
        actions: {
          initial_time_hk: 'DESC'
        }
      },
      where: {
        name: room_name
      }
    })

    const docDefinition = getLogByRooms({ rooms });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async createCleaningAction(action: CleaningAction): Promise<Either<Error, string>> {
    const cleaningActionToCreate = CleaningActionEntity.create(); 

    try {
      // Find room
      let room = await this.repoRoom.findOne({
        where: {
          id: action.getCleaningActionIdRoom().getIdRoom()
        }
      })
      if (!room) return Either.makeLeft<Error, string>(new Error('Room not found'));

      cleaningActionToCreate.room_ = room;

      let user;

      // If user is House Keeper
      if(action.getCleaningActionIdHk()){
        // Find user
         user = await this.repoUser.findOne({
          where: {
            id: action.getCleaningActionIdHk().getIDUser()
          }
        })

        cleaningActionToCreate.hk_ = user;

        cleaningActionToCreate.initial_time_hk = action.getCleaningInitTimeHk().getTime();
        cleaningActionToCreate.end_time_hk = action.getCleaningEndTimeHk().getTime();
        
        // Get cleaning type
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

      cleaningActionToCreate.text = action.getCleaningActionText().getText();

      await this.repository.save(cleaningActionToCreate);
      return Either.makeRight<Error, string>('Action registered');
    } catch (error) {
        console.log(error);
        return Either.makeLeft<Error, string>(error);
    }
  }

  async exportPdf(): Promise<Buffer> {
    try {

      //Get Cleaning Actions by Rooms
      const rooms = await this.repoRoom.find({
        relations: {
          actions: {
            hk_: true,
            cleaning_type_: true,
            sup_: true
          },
          area: true
        }
      })

      let actions_result;
      for(let i = 0; i < rooms.length; i++){
        actions_result = rooms[i].actions as unknown as Array<CleaningActionEntity>
        if(!(actions_result.length > 0))
          rooms.splice(i,1); 
        }

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
              doc.image(join(process.cwd(), "src/upload/logo.png"), doc.page.width - 100, 5, {fit: [45,45], align: 'center'})
              doc.moveTo(50, 55)
              .lineTo(doc.page.width - 50, 55)
              .stroke(); 
            }

            let bottom = doc.page.margins.bottom;

            doc.font("Helvetica").fontSize(14);
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
          doc.image(join(process.cwd(), "src/upload/logo.png"), doc.page.width/2 - 100, 150, {width: 200,})
          doc.text('',0,400);
          doc.font("Helvetica-Bold").fontSize(24);
          doc.text("QRoom",{
            width: doc.page.width,
            align: 'center'
          });

          let type;
          //ForEach room
          for(let i = 0; i < rooms.length; i++)
          {
            let rows_tab: string [][] =[];
            actions_result = rooms[i].actions as unknown as Array<CleaningActionEntity>
            //ForEach action room
            for (let y = 0; y<actions_result.length; y++) {
              let date: string = actions_result[y].initial_time_hk.toString();
              type = actions_result[y].cleaning_type_ as unknown as Array<CleaningTypeEntity>;
              rows_tab.push([actions_result[y].initial_time_hk.toLocaleString(), type.name]);
            }
            
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
              title: `Area: ${rooms[i].area.name}\nRoom: ${rooms[i].name}`,
              subtitle: "EVS PERSONNEL",
              headers: [{label:"Date Initial/time", property:"date", align: "left", headerAlign:"center", }, 
              {label:"TC= Terminal Cleaning\nUv= UV Desinfection\nBL= Blocked (No Terminal Cleaning)", 
              property:"type_cleaning", align: "left", headerAlign:"center", }],//Columns headers
              rows: rows_tab
            };


            doc.table(table, {columnSize:[150,150]})
      }

          const buffer = [];
          doc.on('data', buffer.push.bind(buffer));
          doc.on('end', ()=>{
            const data = Buffer.concat(buffer);
            resolve(data);
          })
          doc.end();
      })

      return pdfBuffer;
    } catch (error) {
      console.log(error);
      return error
    }
  }
  
}
