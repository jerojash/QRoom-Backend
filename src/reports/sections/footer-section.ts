import { Content } from "pdfmake/interfaces"


const logo: Content = {
    image: 'src/upload/hire-place.png',
    width: 150,
    height: 16,
    alignment: 'right',
    margin: [0,16,-165,10],
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