import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header-section";
import { CleaningActionEntity } from "src/cleaningAction/infrastructure/entities/cleaning-action.entity";
import { AreaEntity } from "src/area/infrastructure/entities/area.entity";
import { footerSection } from "./sections/footer-section";
import { DateFormatter } from "./helpers";

interface reportOptions {
  title?: string;
  subTitle?: string;
  actions: CleaningActionEntity[];
  areas: AreaEntity[];
}

export const getCleaningControlPdf = (options: reportOptions) => {

  const { areas } = options;

    const docDefinition: TDocumentDefinitions = {
        pageOrientation: 'landscape',
        header: headerSection({
          title: 'Room Cleaning Control',
          subTitle: areas[0].name,
        }),
        footer: footerSection,
        pageMargins: [40, 105, 40, 60],
        content: [{
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 70, 150, 90, 145, '*' ],
            body: [
              [ 'Room', 'Date', 'Personal', 'Type Cleaning', 'Observation' ],
              ...areas.map((area) => area.rooms.map((room) => 
                room.actions[0] ? [
                  room.name,
                  DateFormatter.getFormattedDate(room.actions[0].initial_time_hk),
                  `${room.actions[0].hk_.first_name} ${room.actions[0].hk_.last_name}`,
                  room.actions[0].cleaning_type_.name ?? '',
                  room.actions[0].text ?? '',
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
            ]
          }
        }],
      };

    return docDefinition;
}