import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from '../helpers';

const logo: Content = {
  image: 'src/upload/logo.png',
  width: 70,
  height: 70,
  alignment: 'center',
  margin: [40, 15, -20, 0],
};

const currentDate: Content = {
    text: DateFormatter.getDDMMMMYYYY(new Date()),
    alignment: 'right',
    margin: [0, 30, 30, 30],
    width: 150,
}

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;
  const headerSubTitle: Content = subTitle? {
    text: subTitle,
    alignment: 'center',
    margin: [0,2,0,0],
    style: {
        bold: true,
        fontSize: 16,
    },
    } : null;

  const headerTitle: Content = title
    ? {
        stack: [
            {
                text: title,
                alignment: 'center',
                margin: [0,15,0,0],
                style: {
                    bold: true,
                    fontSize: 22,
                },
            },
            headerSubTitle
        ]
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};