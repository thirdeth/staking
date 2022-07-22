import { PoolsInfoProps } from 'types';
import { fromDecimals } from 'utils';

export const getPoolAprValue = (poolsInfo: PoolsInfoProps[] | [], stakePeriod: number) => {
  const approximatelyMinutesInYear = 52560000;
  if (poolsInfo.length && poolsInfo[stakePeriod].apr) {
    return Math.round(+fromDecimals(poolsInfo[stakePeriod].apr, 18, false) * approximatelyMinutesInYear);
  }
  return 0;
};
