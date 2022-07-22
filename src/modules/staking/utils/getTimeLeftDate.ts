import { dateFormatter } from 'utils';

export const getTimeLeftDate = (timestamp: number | string) => {
  const diffBetweenNow = new Date(timestamp).getTime() - Date.now();
  const lessThenDate = 60 * 60 * 24;

  if (diffBetweenNow < lessThenDate) {
    return dateFormatter(timestamp);
  }
  return dateFormatter(timestamp, 'lll', true);
};
