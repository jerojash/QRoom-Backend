import { Content } from "pdfmake/interfaces"


const logo: Content = {
    image: 'src/upload/hire-place.png',
    width: 150,
    height: 16,
    alignment: 'center',
    margin: [20,16,-40,10],
};

const logoEnterprise: Content = {
    image: 'src/upload/hire-place.png',
    width: 170,
    height: 20,
    alignment: 'center',
    margin: [0,5,0,10],
};

export const footerSection = (currentPage: number, pageCount: number): Content => {

    const footerLogo = logo;
    return {
        columns: [
            footerLogo,
            {
                text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
                alignment: 'right',
                fontSize: 14,
                margin: [0,15,40,10]
            },
    ]
    }

}

export const footerSection2 = (): Content => {

    const footerLogo = logoEnterprise;
    return {
        layout: 'noBorders', // optional
        alignment: 'center',
        margin: [0,-15,0,25],
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '*' ],
          heights: 'auto',
          body: [
            [{
              text: 'Created By',
              style: {
                bold: true,
                color: '#8b8b8b'
              }
            }],
            [footerLogo],
            
          ],
        },
      }

}