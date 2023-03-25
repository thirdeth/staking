import BigNumber from 'bignumber.js/bignumber';

export const getVestingAnlockAmount = (claimAmount: string, percent: string, decimals: string | number) => {
  return new BigNumber(claimAmount).multipliedBy(new BigNumber(percent)).dividedBy(new BigNumber(10).pow(12));
};
