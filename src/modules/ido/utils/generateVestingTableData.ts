import BigNumber from 'bignumber.js/bignumber';
import { VestingTableDataProps } from 'modules/layout/containers/NotificationModal/VestingModal/VestingModal.types';
import { VestingInfoProps } from 'types';

import { dateFormatter } from '../../../utils/dateFormatter';

import { getVestingAnlockAmount } from './getVestingAnlockAmount';

export const generateVestingTableData = (
  claimAmount: string[],
  endTime: number,
  vestingInfo: VestingInfoProps,
): VestingTableDataProps[] => {
  const { startUnlockPercent, unlockPercent, unlockStepTime } = vestingInfo;

  let stageCount = 0;
  const firstAnlockAmount = getVestingAnlockAmount(claimAmount[0], startUnlockPercent);

  const resultVestingData: VestingTableDataProps[] = [
    {
      id: stageCount,
      anlockTime: dateFormatter(endTime) as string,
      anlockAmount: firstAnlockAmount.toFixed(0, 1),
    },
  ];

  const stepAnlockAmount = getVestingAnlockAmount(claimAmount[0], unlockPercent);

  let sumOfUnlockAmount = firstAnlockAmount;

  while (new BigNumber(sumOfUnlockAmount).isLessThan(new BigNumber(claimAmount[0]))) {
    stageCount += 1;
    sumOfUnlockAmount = sumOfUnlockAmount.plus(stepAnlockAmount);

    resultVestingData.push({
      id: stageCount,
      anlockTime: dateFormatter(endTime + +unlockStepTime * stageCount) as string,
      anlockAmount: stepAnlockAmount.toFixed(0, 1),
    });
  }

  if (!new BigNumber(sumOfUnlockAmount).isEqualTo(new BigNumber(claimAmount[0]))) {
    resultVestingData[resultVestingData.length - 1] = {
      id: stageCount + 1,
      anlockTime: dateFormatter(endTime + +unlockStepTime * stageCount) as string,
      anlockAmount: new BigNumber(claimAmount[0]).minus(sumOfUnlockAmount).plus(stepAnlockAmount).toFixed(0, 1),
    };
  }

  return resultVestingData;
};
