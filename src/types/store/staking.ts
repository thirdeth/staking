import { Investor } from 'types/api/Investor';

export type StakingState = {
  totalStakedAmount: string;
  userStakes: string[][];
  topInvestors: Investor[];
};
