import moment from 'moment';

export const dateFormatter = (date: number | string, format = 'lll', daysLeftFormat = false) => {
  if (typeof date === 'string') {
    return date;
  }
  if (daysLeftFormat) {
    const differenceDate = moment(date * 1000).diff(moment(), 'days');
    return differenceDate >= 0 ? differenceDate : '0';
  }
  return moment(date * 1000).format(format);
};
