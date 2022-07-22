import { Investor } from 'types/api/Investor';

export type PoolsInfoProps = {
  apr: string;
  commission: string;
  timeLockUp: string;
};

export type StakingState = {
  totalStakedAmount: string;
  userStakes: string[][];
  topInvestors: Investor[];
  poolsInfo: PoolsInfoProps[];
};
