import BigNumber from 'bignumber.js';
import { Nullable } from 'types';
import { getDiffHardcapTotalBought, toDecimals } from 'utils';

type ValudateMaxInvestProps = {
  contractHardCap: string;
  nativeBalance: string;
  tokenPrice: number;
  userAllocation: Nullable<string>;
  totalBought: string;
  payed: string;
  bought: string;
  decimals: number;
};

export const validateMaxInvestValue = ({
  contractHardCap,
  nativeBalance,
  tokenPrice,
  userAllocation,
  totalBought,
  payed,
  bought,
  decimals = 18,
}: ValudateMaxInvestProps): string => {
  const allocationPercent = userAllocation
    ? new BigNumber(toDecimals(userAllocation, decimals)).multipliedBy(100).dividedBy(contractHardCap).toString()
    : 0;
  const diffAllocationPayedValue = userAllocation
    ? new BigNumber(allocationPercent)
        .minus(new BigNumber(bought).dividedBy(contractHardCap).multipliedBy(100))
        .toString() // +new BigNumber(+userAllocation).minus(new BigNumber(payed).dividedBy(new BigNumber(10).pow(18))).toString()
    : 0;

  const maxRequireInvestValue = getDiffHardcapTotalBought(contractHardCap, totalBought, decimals)
    .multipliedBy(tokenPrice)
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
    maxCalcValue = new BigNumber(new BigNumber(contractHardCap).dividedBy(new BigNumber(10).pow(decimals)))
      .multipliedBy(diffAllocationPayedValue)
      .dividedBy(100)
      .multipliedBy(tokenPrice)
      .toString(); // diffAllocationPayedValue;
  } else {
    maxCalcValue = 0;
  }

  if (+nativeBalance > maxCalcValue) {
    if (maxCalcValue > maxRequireInvestValue) {
      return maxRequireInvestValue.toString();
    }
    return maxCalcValue.toString();
  }

  return nativeBalance;
};
