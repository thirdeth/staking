import moment from 'moment';

export const dateFormatter = (date: number | string, format = 'lll') => {
  if (typeof date === 'string') {
    return date;
  }
  return moment(date * 1000).format(format);
};
