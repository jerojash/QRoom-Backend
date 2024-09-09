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
  areasDashboard1?: AreaEntity[];
  areasDashboard2?: AreaEntity[];
  areasDashboard3?: AreaEntity[];
  rooms?: RoomEntity[];
}

const logo: Content = {
  image: 'src/upload/logo.png',
  width: 200,
  height: 200,
  alignment: 'center',
  margin: [0,280,0,10],
};

export const getDashboard = (options: reportOptions) => {

  const { areasDashboard1, areasDashboard2, areasDashboard3 } = options;

    const docDefinition: TDocumentDefinitions = {
        pageSize: {
          width: 1100,
          height: 750
        },
        // pageOrientation: 'portrait',
        header: headerSection({
          title: `Children's Hospital Los Angeles`,
          subTitle: 'Operating or Procedure Room Terminal Cleaning Log',
        }),
        footer: footerSection,
        pageMargins: [40, 105, 40, 60],
        content: [
          areasDashboard1.length > 0 ? 
          [
            ...createTile('Dashboard', areasDashboard1[0].name), 
            createTableDashboard(areasDashboard1)
          ]
          : null,
          areasDashboard2.length > 0 ? 
          [
            ...createTile('Dashboard', areasDashboard2[0].name), 
            createTableDashboard(areasDashboard2)
          ]
          : null,
          areasDashboard3.length > 0 ? 
          [
            ...createTile('Dashboard', 'ASC, PACU, Hemodialysis, SPD, CATH Lab, IR'),
            createTableDashboard(areasDashboard3, false)
          ]
          : null,
          // rooms.length > 0 ? [...rooms.map((room) => createTableRooms(room))] : null
        ].flat(),
      };

    return docDefinition;
}

export const getLogByRooms = (options: reportOptions) => {

  const { rooms } = options;

    const docDefinition: TDocumentDefinitions = {
        pageSize: {
          width: 1100,
          height: 750
        },
        pageOrientation: 'portrait',
        header: headerSection({
          title: `Children's Hospital Los Angeles`,
          subTitle: 'Operating or Procedure Room Terminal Cleaning Log',
        }),
        footer: footerSection,
        pageMargins: [40, 105, 40, 60],
        content: [
          rooms.length > 0 ? [...rooms.map((room) => createTableRooms(room))] : null
        ].flat(),
      };

    return docDefinition;
}

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
      pageOrientation:'landscape',
      // pageBreak: 'before',
    },
    {
      text: subTitle,
      alignment: 'center',
      margin: [0,-2,0,15],
      style: {
          // bold: true,
          fontSize: 16,
      },
    },
  ]
}

function createTableDashboard(area: AreaEntity[], next: boolean = true): Content {
  const url = `${process.env.URL}/api/cleaning-action/pdf`
  console.log('url: ', url);
  return {
    layout: 'customLayout01', // optional
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: [ 130, 160, 165, '*' ],
      heights: 'auto',
      body: [
        // Columns Headers
        [ 
          {
            text: 'Room',
            style: {
              bold: true
            }
          }, 
          {
            text: 'Date',
            style: {
              bold: true
            }
          },
          {
            text: 'Type Cleaning',
            style: {
              bold: true
            }
          }, 
          {
            text: 'Observation',
            style: {
              bold: true
            }
          }],
          // Rows
        ...area.map((area) => area.rooms.map((room) => 
          room.actions[0] ? [
            {
              text: room.name,
              link: `${url}/${room.name}`,
              style: {
                bold: true,
                fontSize: 17,
                color: '#002dfa'
              }
            },
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
          ]
        )).flat()
      ],
    },
    pageBreak: next ? 'after' : null,
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
          // Columns Headers
        [
          {
            text: 'Date, Time',
            style: {
              bold: true
            }
          },
          {
            text: 'Personnel',
            style: {
              bold: true
            }
          },
          {
            text: 'Type Cleaning',
            style: {
              bold: true
            }
          }, 
          {
            text: 'Observation',
            style: {
              bold: true
            }
          }],
          // Rows
          ...(room.actions as unknown as Array<CleaningActionEntity>).map((action) => 
            action ? 
            [
              // First column
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
