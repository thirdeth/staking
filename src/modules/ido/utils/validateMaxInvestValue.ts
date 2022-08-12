import BigNumber from 'bignumber.js';
import { Nullable } from 'types';
import { getDiffHardcapTotalBought } from 'utils';

type ValudateMaxInvestProps = {
  contractHardCap: string;
  nativeBalance: string;
  tokenPrice: number;
  userAllocation: Nullable<string>;
  totalBought: string;
  payed: string;
  decimals: number;
};

export const validateMaxInvestValue = ({
  contractHardCap,
  nativeBalance,
  tokenPrice,
  userAllocation,
  totalBought,
  payed,
  decimals = 18,
}: ValudateMaxInvestProps): string => {
  const diffAllocationPayedValue = userAllocation
    ? +new BigNumber(+userAllocation).minus(new BigNumber(payed).dividedBy(new BigNumber(10).pow(18))).toString()
    : 0;

  const maxRequireInvestValue = getDiffHardcapTotalBought(contractHardCap, totalBought, decimals)
    .multipliedBy(new BigNumber(tokenPrice))
    .toString();

  let maxCalcValue;
  if (!userAllocation) {
    maxCalcValue = maxRequireInvestValue;

    if (+nativeBalance > +maxCalcValue) {
      return maxCalcValue.toString();
    }
    return nativeBalance;
  }

  if (diffAllocationPayedValue > 0) {
    maxCalcValue = diffAllocationPayedValue;
  } else {
    maxCalcValue = 0;
  }

  if (+nativeBalance > maxCalcValue) {
    return maxCalcValue.toString();
  }

  return nativeBalance;
};
