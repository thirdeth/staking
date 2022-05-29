import BigNumber from 'bignumber.js/bignumber';

import { formatNumber } from './numberFormatter';

export const getTokenAmount = (
  balance: string | number,
  decimals = 18,
  shouldForamateNumber = false,
): string | BigNumber => {
  if (balance === '') {
    return '0';
  }

  if (typeof balance === 'number') {
    balance.toString();
  }

  const displayValue = new BigNumber(balance).multipliedBy(new BigNumber(10).pow(decimals));

  if (shouldForamateNumber) {
    const formattedValue = formatNumber(+displayValue.toString());

    return formattedValue;
  }

  return displayValue.toString(10);
};

export const getTokenAmountParts = (value: string | number, decimals = 18): string[] => {
  const partValue = +value / 3;

  if (+value % 3 > 0) {
    const one = Math.ceil(partValue);
    const two = Math.floor(partValue);

    let firstPart = new BigNumber(one).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(0, 1);
    const twoLastPart = new BigNumber(two).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(0, 1);

    const remain = +value - one - two - two;
    if (+remain > 0) {
      firstPart = new BigNumber(one + remain).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(0, 1);
    }
    return [firstPart, twoLastPart, twoLastPart];
  }

  const firstPart = new BigNumber(partValue).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(0, 1);
  const twoLastPart = new BigNumber(partValue).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(0, 1);
  return [firstPart, twoLastPart, twoLastPart];
};

export const getTokenAmountDisplay = (balance: string | number, decimals = 18): string => {
  if (balance === '') {
    return '0';
  }

  if (typeof balance === 'number') {
    balance.toString();
  }

  const displayValue = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals));

  return parseFloat(displayValue.toFixed(4)).toString();
};
