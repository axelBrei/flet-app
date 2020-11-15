import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export const formatDate = (date, format = DEFAULT_DATE_FORMAT) =>
  date.format(format);

export const fromDate = (date, format = DEFAULT_DATE_FORMAT) =>
  dayjs(date.toString(), format);
