import { useEffect, useState } from 'react';
import { toggleButtonItems } from 'modules/staking/containers/StakingForm/StakingForm.helpers';
import { getPoolAprValue } from 'modules/staking/utils';
import { PoolsInfoProps } from 'types';

// length like StakePeriod array length
const DEFAULT_POOLS_APR_VALUES = [7, 25, 70];

export const useGetPoolsAprArray = (poolsInfo: PoolsInfoProps[]): number[] => {
  const [poolsAprValues, setPoolsAprValues] = useState<number[]>(DEFAULT_POOLS_APR_VALUES);

  useEffect(() => {
    if (poolsInfo.length) {
      const aprValuesArr = toggleButtonItems.map((_, index) => getPoolAprValue(poolsInfo, index));
      setPoolsAprValues(aprValuesArr);
    }
  }, [poolsInfo]);

  return poolsAprValues;
};
