import BigNumber from 'bignumber.js/bignumber';

import { formatNumber } from './numberFormatter';

export const toDecimals = (balance: string | number, decimals = 18, shouldForamateNumber = false): string => {
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

export const fromDecimals = (balance: string | number, decimals = 18, forDisplay = true): string => {
  if (balance === '') {
    return '0';
  }

  if (typeof balance === 'number') {
    balance.toString();
  }

  const displayValue = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals));

  return forDisplay ? parseFloat(displayValue.toFixed(4)).toString() : displayValue.toFixed(10, 1);
};

export const fromDecimalsDisplay = (balance: string | number, decimals = 18) =>
  new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals)).toString(10);
