export class DateFormatter {
    static formatter = new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  
    static getDDMMMMYYYY(date: Date): string {
      return this.formatter.format(date);
    }

    static getFormattedDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      const datePart = date.toLocaleDateString('en-US', options);
      const timePart = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      return `${datePart.replace(',', '')} ${timePart}`;
    }
}