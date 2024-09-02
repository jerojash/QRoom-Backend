import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header-section";
import { CleaningActionEntity } from "src/cleaningAction/infrastructure/entities/cleaning-action.entity";
import { AreaEntity } from "src/area/infrastructure/entities/area.entity";
import { footerSection, footerSection2 } from "./sections/footer-section";
import { DateFormatter } from "./helpers";
import { RoomEntity } from "src/room/infrastructure/entities/room.entity";

interface reportOptions {
  title?: string;
  subTitle?: string;
  areasDashboard1: AreaEntity[];
  areasDashboard2: AreaEntity[];
  areasDashboard3: AreaEntity[];
  rooms: RoomEntity[];
}

const logo: Content = {
  image: 'src/upload/logo.png',
  width: 200,
  height: 200,
  alignment: 'center',
  margin: [0,280,0,10],
};

function createCover(): Content {
  return {
    layout: 'noBorders', // optional
    alignment: 'center',
    margin: [0,0,0,0],
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: [ '*' ],
      heights: 'auto',
      body: [
        [ '' ],
        [logo],
        [{
          text: `Children's Hospital Los Angeles`,
          margin: [0,25,0,6],
          style: {
              bold: true,
              fontSize: 27,
          },
        }],
        [{
          text: `Operating or Procedure Room Terminal Cleaning Log`,
          margin: [0,2,0,10],
          style: {
              bold: true,
              fontSize: 19,
          },
        }],
      ],
    },
    pageBreak: 'after',
    pageOrientation: 'landscape',
  }
}

function createTile(title: string, subTitle: string): Content[] {
  return [
    {
      text: title,
      alignment: 'center',
      margin: [0,-2,0,5],
      style: {
          bold: true,
          fontSize: 20,
      },
    },
    {
      text: subTitle,
      alignment: 'center',
      margin: [0,-2,0,15],
      style: {
          // bold: true,
          fontSize: 16,
      },
    }
  ]
}

export const getCleaningControlPdf = (options: reportOptions) => {

  const { areasDashboard1, areasDashboard2, areasDashboard3, rooms } = options;

    const docDefinition: TDocumentDefinitions = {
        pageSize: {
          width: 1100,
          height: 750
        },
        pageOrientation: 'portrait',
        header: function (page) {
          if (page === 1) {
            return  
          } else {
            return headerSection({
              title: `Children's Hospital Los Angeles`,
              subTitle: 'Operating or Procedure Room Terminal Cleaning Log',
            });
          }
        },
        footer: function (page, pages) {
          if (page === 1) {
            return  footerSection2()
          } 
          return footerSection(page, pages);
        },
        pageMargins: [40, 105, 40, 60],
        content: [
          createCover(),
          ...createTile('Areas Log', areasDashboard1[0].name),
          createTableDashboard(areasDashboard1),
          ...createTile('Areas Log', areasDashboard2[0].name),
          createTableDashboard(areasDashboard2),
          ...createTile('Areas Log', 'ASC, PACU, Hemodialysis, SPD, CATH Lab, IR'),
          createTableDashboard(areasDashboard3, false),
          ...rooms.map((room) => createTableRooms(room))
        ].flat(),
      };

    return docDefinition;
}

function createTableDashboard(area: AreaEntity[], next: boolean = true): Content {
  return {
    layout: 'customLayout01', // optional
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: [ 90, 150, 90, 145, '*' ],
      heights: 'auto',
      body: [
        [ 'Room', 'Date', 'Personnel', 'Type Cleaning', 'Observation' ],
        ...area.map((area) => area.rooms.map((room) => 
          room.actions[0] ? [
            room.name,
            // If it has been more than 24 hours
            (new Date().getTime() - room.actions[0].initial_time_hk.getTime()) > 24 * 60 * 60 * 1000
            ? 
            {
              text: DateFormatter.getFormattedDate(room.actions[0].initial_time_hk),
              style: {
                bold: true,
                color: '#fa1d0b',
              },
            }
            : 
            {
              text: DateFormatter.getFormattedDate(room.actions[0].initial_time_hk),
            },
            `${room.actions[0].hk_.first_name} ${room.actions[0].hk_.last_name}`,
            room.actions[0].cleaning_type_.name ?? '',
            {
              text: room.actions[0].text ?? '',
              style: {
                fontSize: 10
              }
            },
          ] 
          : 
          [
            room.name,
            '',
            '',
            '',
            '',
          ]
        )).flat()
      ],
    },
    pageOrientation: next ? 'landscape' : 'portrait',
    pageBreak: next ? 'after': null,
  }
}

function createTableRooms(room: RoomEntity): Content[] {
  
  return [
      {
        text: 'Rooms Log',
        alignment: 'center',
        margin: [0,-2,0,15],
        style: {
            bold: true,
            fontSize: 20,
        },
        pageOrientation: 'portrait',
        pageBreak: 'before'
      },
      {
        text: `Area: ${room.area.name}\nRoom: ${room.name}`,
        alignment: 'left',
        margin: [0,-2,0,15],
        style: {
            bold: true,
            fontSize: 16,
        },
      },
      {
      layout: 'customLayout01', // optional
      table: {
        headerRows: 1,
        widths: [ 150, 90, 145, '*' ],
        heights: 'auto',
        body: [
          [ 'Date, Time', 'Personnel Name', 'Type Cleaning', 'Observation' ],
          ...(room.actions as unknown as Array<CleaningActionEntity>).map((action) => 
            action ? 
            [
              // First column
              (new Date().getTime() - new Date(action.initial_time_hk).getTime()) > 24 * 60 * 60 * 1000
              ? 
              {
                text: DateFormatter.getFormattedDate(new Date(action.initial_time_hk)),
                style: {
                  bold: true,
                  color: '#fa1d0b',
                },
              }
              : 
              {
                text: DateFormatter.getFormattedDate(new Date(action.initial_time_hk)),
              },
              // Second column
              `${action.hk_.first_name} ${action.hk_.last_name}`,
              // Third column
              action.cleaning_type_.name,
              // Last column
              {
                text: action.text ?? '',
                style: {
                  fontSize: 10
                }
              },
            ] : ['','','',''])
        ],
      },
      pageOrientation: 'portrait',
    }
  ]
}
