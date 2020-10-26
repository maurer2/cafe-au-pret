export function getTimeFormatted(dateTimeFormatter: Intl.DateTimeFormat, dateTime: Date): string {
  const dateFormatted = dateTimeFormatter.formatToParts(dateTime);

  // only contains last literal separator e.g. seconds literal not date literal
  const { hour, minute, second } = Object.fromEntries(
    dateFormatted.map((datePart) => [datePart.type, datePart.value]),
  );

  return `${hour}:${minute}:${second}`;
}

export function getDateFormatted(dateTimeFormatter: Intl.DateTimeFormat, dateTime: Date): string {
  const dateFormatted = dateTimeFormatter.formatToParts(dateTime);

  // only contains last literal separator e.g. seconds literal not date literal
  const { day, month, year } = Object.fromEntries(
    dateFormatted.map((datePart) => [datePart.type, datePart.value]),
  );

  return `${day}/${month}/${year}`;
}

export const dateTimeOptions: { [key: string]: Intl.DateTimeFormatOptions } = {
  gb: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  },
};
