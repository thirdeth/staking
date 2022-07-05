import { UserStakingRankIds } from 'components';
import { IdoStatus } from 'types/store/requests';

enum ProjectStatusValues {
  progress,
  completed,
  loading,
}

enum ColorValues {
  transparent,
  blue,
  gray,
}

enum VariantValues {
  project,
  rank,
  stakes,
}

export type ColorProps = keyof typeof ColorValues;
export type VariantProps = keyof typeof VariantValues;
export type ProjectStatusProps = keyof typeof ProjectStatusValues;

type TokenProps = {
  name: string;
  icon: string;
  symbol: string;
};

export interface ProjectCardDataProps {
  id?: number;
  projectName?: string;
  projectIcon?: string;
  token?: TokenProps;
  status?: IdoStatus;
  boughtAmount?: string | number;
  buyDate?: string | number;
  startTime: string;
  hardCap: number;
}

export interface RankCardDataProps {
  id: number;
  rankId?: UserStakingRankIds;
  growAmount: number;
  walletAddress?: string;
  stakedAmount?: string;
  buyDate?: string | number;
}

export interface StakesCardDataProps {
  id: number;
  stakesData?: string[];
}
