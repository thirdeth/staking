import moment from 'moment';

export const dateFormatter = (date: number | string, format = 'lll', daysLeftFormat = false) => {
  if (typeof date === 'string') {
    return date;
  }
  if (daysLeftFormat) {
    return `${moment(date * 1000).diff(moment(), 'days')} D`;
  }
  return moment(date * 1000).format(format);
};
