import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection, headerSection2 } from "./sections/header-section";
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

function calcularDiferenciaEnHoras(fecha1: Date, fecha2: Date): number {
  // Calculamos la diferencia en milisegundos
  const diferenciaMilisegundos = Math.abs(fecha2.getTime() - fecha1.getTime());

  // Convertimos la diferencia a horas y redondeamos hacia abajo
  const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));

  // Retornamos 0 si la diferencia es menor a una hora
  return diferenciaHoras > 0 ? diferenciaHoras : 0;
}

function getCurrentDateInGMT8(): Date {
  const date = new Date();
  // Obtenemos la hora UTC
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  // Sumamos 8 horas para GMT+8
  const gmt8 = new Date(utc - 7 * 3600000);
  return gmt8;
}

function obtenerColorPorDiferenciaHoras(fechaInicio: Date, fechaFin: Date): string {
  const diferenciaEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
  const diferenciaEnHoras = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60));

  if (diferenciaEnHoras <= 20) {
    return "#42A341";
  } else if (diferenciaEnHoras <= 24) {
    return "#F8FF2B";
  } else {
    return "#EB2C2B";
  }
}

export const getDashboardExcel = (options: reportOptions) => {

  const { areasDashboard1 } = options;
  const gmt8 = getCurrentDateInGMT8();
  console.log('GMT8: ', gmt8);
  const currentDate = DateFormatter.getFormattedDate(gmt8);

  console.log('CURRENT DATE: ', currentDate);

    const docDefinition: TDocumentDefinitions = {
        pageSize: {
          width: 1120,
          height: 1000
        },
        // pageOrientation: 'portrait',
        header: headerSection2({
          title: `Children's Hospital Los Angeles`,
          subTitle: 'Operating or Procedure Room Terminal Cleaning Log',
        }),
        footer: footerSection,
        pageOrientation: 'landscape',
        pageMargins: [40, 105, 40, 60],
        content: [
          areasDashboard1.length > 0 ? 
          [
            ...createTileExcel('Dashboard', `Last Update: ${currentDate}`), 
            createTableDashboardExcel(areasDashboard1, currentDate)
          ]
          : null
          // rooms.length > 0 ? [...rooms.map((room) => createTableRooms(room))] : null
        ].flat(),
      };

    return docDefinition;
}

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

function createTileExcel(title: string, subTitle: string): Content[] {
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
      alignment: 'left',
      margin: [0,-2,0,15],
      style: {
          // bold: true,
          fontSize: 12,
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
                fontSize: 14,
                // color: '#002dfa'
                // decoration: 'underline'
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
            {
              text: room.name,
              link: `${url}/${room.name}`,
              style: {
                bold: true,
                fontSize: 14,
                // color: '#002dfa'
                // decoration: 'underline'
              }
            },
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

function createTableDashboardExcel(area: AreaEntity[], currentDate: string): Content {
  
  return {
    layout: 'customLayout02', // optional
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: [ 127, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 42 ],
      heights: 20,
      body: [
        // Columns Headers
        [ {
            text: 'Area',
            style: {
              bold: true,
              alignment: 'center'
            }
          },
          {
            text: '1',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, 
          {
            text: '2',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, {
            text: '3',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, 
          {
            text: '4',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, {
            text: '5',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, 
          {
            text: '6',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, {
            text: '7',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, 
          {
            text: '8',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, {
            text: '9',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, 
          {
            text: '10',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, {
            text: '11',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, 
          {
            text: '12',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, {
            text: '13',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, 
          {
            text: '14',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, {
            text: '15',
            style: {
              bold: true,
              fontSize: 15,
              alignment: 'center'
            }
          }, 
        ],
          // Rows
        ...area.map((area) => 
        [
          { text : area.name, 
            style: { alignment: 'center' }
          } , 
          area.rooms[0] && area.rooms[0].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[0].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[0].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[0].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[1] && area.rooms[1].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[1].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[1].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[1].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[2] && area.rooms[2].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[2].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[2].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[2].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[3] && area.rooms[3].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[3].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[3].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[3].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          }: 
          { 
            text: '' 
          },
          area.rooms[4] && area.rooms[4].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[4].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[4].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[4].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[5] && area.rooms[5].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[5].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[5].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[5].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[6] && area.rooms[6].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[6].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[6].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[6].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[7] && area.rooms[7].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[7].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[7].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[7].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          }: 
          { 
            text: '' 
          },
          area.rooms[8] && area.rooms[8].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[8].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[8].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[8].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[9] && area.rooms[9].actions[0] ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[9].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[9].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[9].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[10]&& area.rooms[10].actions[0]  ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[10].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[10].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[10].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[11]&& area.rooms[11].actions[0]  ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[11].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[11].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[11].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          }: 
          { 
            text: '' 
          },
          area.rooms[12]&& area.rooms[12].actions[0]  ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[12].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[12].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[12].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          }: 
          { 
            text: '' 
          },
          area.rooms[13]&& area.rooms[13].actions[0]  ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[13].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[13].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[13].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
          area.rooms[14]&& area.rooms[14].actions[0]  ? 
          { text :`${calcularDiferenciaEnHoras(area.rooms[14].actions[0].end_time_hk, new Date(currentDate) )}`, 
            link: `${process.env.URL}/api/cleaning-action/pdf/${area.rooms[14].name}`,
            style: { 
              alignment: 'center',
              bold: true,
              fontSize: 13, 
              fillColor: obtenerColorPorDiferenciaHoras(area.rooms[14].actions[0].end_time_hk, new Date(currentDate) ) 
            }
          } : 
          { 
            text: '' 
          },
        ]
        )
      ],
    },
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
