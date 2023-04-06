import { Chains, IChainType } from 'types/connect';

export type UserState = {
  address: string;
  provider: string;
  chainType: IChainType;
  network: Chains;
  tokenBalance: string;
  xtokenBalance: string;
  nativeBalance: string;
  rankId: string;
  key: string;
};
