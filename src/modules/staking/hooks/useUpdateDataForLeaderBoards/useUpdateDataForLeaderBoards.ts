import { RankCardDataProps } from 'components/Cards/RowCard/RowCard.types';
import { useShallowSelector } from 'hooks';
import stakingSelector from 'store/staking/selectors';

export const useUpdateDataForLeaderBoards = (): RankCardDataProps[] => {
  const topInvestors = useShallowSelector(stakingSelector.getProp('topInvestors'));

  return topInvestors.map(({ address, lastStaked, stakeAmount, positionDelta }, index) => {
    return {
      id: index,
      rankId: 1,
      walletAddress: address,
      stakedAmount: (+stakeAmount).toFixed(4),
      buyDate: lastStaked,
      growAmount: positionDelta,
    };
  });
};
