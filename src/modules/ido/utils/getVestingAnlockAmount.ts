import BigNumber from 'bignumber.js/bignumber';

export const getVestingAnlockAmount = (claimAmount: string, percent: string) => {
  return new BigNumber(claimAmount).multipliedBy(new BigNumber(percent)).dividedBy(new BigNumber(10).pow(12));
};
