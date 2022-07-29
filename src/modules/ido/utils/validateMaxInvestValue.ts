import BigNumber from 'bignumber.js';
import { Nullable } from 'types';

export const validateMaxInvestValue = (
  hardCap: string,
  nativeBalance: string,
  tokenPrice: number,
  userAllocation: Nullable<string>,
  totalBought: string,
): string => {
  const hardCapWithDecimals = new BigNumber(+hardCap).multipliedBy(new BigNumber(10).pow(18));
  const totalBoughtBN = new BigNumber(totalBought);

  const maxRequireInvestValue = +hardCapWithDecimals
    .minus(totalBoughtBN)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(10, 1);

  let maxCalcValue;
  if (!userAllocation) {
    maxCalcValue = +maxRequireInvestValue * +tokenPrice;

    if (+nativeBalance > maxCalcValue) {
      return maxCalcValue.toString();
    }
    return nativeBalance;
  }

  if (+userAllocation < maxRequireInvestValue) {
    maxCalcValue = +userAllocation * +tokenPrice;
  } else {
    maxCalcValue = +maxRequireInvestValue * +tokenPrice;
  }

  if (+nativeBalance > maxCalcValue) {
    return maxCalcValue.toString();
  }

  return nativeBalance;
};
