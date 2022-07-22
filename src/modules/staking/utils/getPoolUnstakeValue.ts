import { PoolsInfoProps } from 'types';
import { fromDecimals } from 'utils';

export const getPoolUnstakeValue = (poolsInfo: PoolsInfoProps[] | [], stakePeriod: number) => {
  if (poolsInfo.length && poolsInfo[stakePeriod]?.commission) {
    return +fromDecimals(poolsInfo[stakePeriod].commission, 18) * 100;
  }
  return 0;
};
