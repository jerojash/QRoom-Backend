import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, CustomTableLayout, TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};
const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    hLineWidth: function (i, node) {
      if (i === 0) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#bbbbbb';
    },
    paddingLeft: function (i) {
      return i === 0 ? 4 : 12;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    paddingBottom: function (i, node) {
      return i === 0 ? 7 : 3;
    },
    paddingTop: function (i, node) {
      return i === 0 ? 7 : 3;
    },
    fillColor: function (i, node) {
      if (i === 0) {
        return '#e0dddd';
      }

      return null;
    },
  },
};

@Injectable()
export class PrinterService {

    private printer = new PdfPrinter(fonts);

    createPdf( 
        docDefinition: TDocumentDefinitions, 
        options: BufferOptions = {
          tableLayouts: customTableLayouts,
        }
    ):PDFKit.PDFDocument
    {
        return this.printer.createPdfKitDocument(docDefinition, options);
    }
}
