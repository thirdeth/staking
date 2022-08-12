import BigNumber from 'bignumber.js/bignumber';

export const getDiffHardcapTotalBought = (
  hardcap: string | number,
  totalBought: string | number,
  decimals: string | number,
) => {
  return new BigNumber(hardcap).minus(new BigNumber(totalBought)).dividedBy(new BigNumber(10).pow(decimals));
};
