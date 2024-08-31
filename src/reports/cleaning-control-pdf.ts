import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header-section";
import { CleaningActionEntity } from "src/cleaningAction/infrastructure/entities/cleaning-action.entity";
import { AreaEntity } from "src/area/infrastructure/entities/area.entity";
import { footerSection } from "./sections/footer-section";

interface reportOptions {
  title?: string;
  subTitle?: string;
  actions: CleaningActionEntity[];
  areas: AreaEntity[];
}

export const getCleaningControlPdf = (options: reportOptions) => {

  const { areas } = options;

  console.log('areas: ', areas);
  console.log('BODY: ', ...areas.map((area) => area.rooms.map((room) => [
    area.name,
    room.name,
    'HELLO!',
    'HEY'
  ])).flat());

    const docDefinition: TDocumentDefinitions = {
        pageOrientation: 'landscape',
        header: headerSection({
          title: 'Rooms Control',
          subTitle: 'Control Rooms',
        }),
        footer: footerSection,
        pageMargins: [40, 105, 40, 60],
        content: [{
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 150, 150, 100, '*' ],
    
            body: [
              [ 'Area', 'Room', 'Third', 'The last one' ],
              ...areas.map((area) => area.rooms.map((room) => [
                area.name,
                room.name,
                'HELLO!',
                'HEY'
              ])).flat()
            ]
          }
        }],
      };

    return docDefinition;
}