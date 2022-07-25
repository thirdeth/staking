import { dateFormatter } from 'utils';

export const getTimeLeftDate = (timestamp: number | string) => {
  const diffBetweenNow = new Date(+timestamp * 1000).getTime() - Date.now();
  const oneDayTime = 60 * 60 * 24 * 1000;

  if (diffBetweenNow < oneDayTime) {
    return dateFormatter(timestamp);
  }

  return dateFormatter(timestamp, 'lll', true);
};
