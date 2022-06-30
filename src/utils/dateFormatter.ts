import moment from 'moment';

export const dateFormatter = (date: number | string, format = 'lll', daysLeftFormat = false) => {
  if (typeof date === 'string') {
    return date;
  }
  if (daysLeftFormat) {
    return moment().diff(moment(date * 1000), 'days');
  }
  return moment(date * 1000).format(format);
};
