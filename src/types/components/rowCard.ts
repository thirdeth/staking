import { UserStakingRankIds } from 'components';

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
  pool,
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
  id: number;
  projectName?: string;
  projectIcon?: string;
  token?: TokenProps;
  status?: ProjectStatusProps;
  boughtAmount?: string | number;
  buyDate?: string | number;
}

export interface RankCardDataProps {
  id: number;
  rankId?: UserStakingRankIds;
  isGrow?: boolean;
  walletAddress?: string;
  stakedAmount?: string;
  buyDate?: string | number;
}
