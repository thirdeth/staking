import { IdoPublic, IdoStatus } from 'types/store/requests';
import Web3 from 'web3';

export type HelloWorldReq = {
  key: string;
};

export type GetIdoListReq = {
  public: IdoPublic;
  status: IdoStatus | IdoStatus[];
  count: number;
  start: number;
  isMyIdos?: boolean;
  owner?: string;
  shouldConcat?: boolean;
};

export type BodyWithToken<T = never> = {
  token?: string;
} & T;

export type LoginReq = {
  address: string;
  web3Provider: Web3;
};

export type ApiResponse<T = never> = {
  data: BodyWithToken<T>;
  statusCode?: number;
  error?: string;
  message?: string | string[];
};

export interface RequestWithWeb3Provider {
  web3Provider: Web3;
}

export type ApproveReq = {
  amount: string;
  spenderAddress: string;
  tokenAddress: string;
  web3Provider: Web3;
} & RequestWithWeb3Provider;

export type StakeReq = {
  amount: string;
  poolId: number;
} & RequestWithWeb3Provider;

export type ChangeUserStakeItemReq = {
  stakeIndex: number;
} & RequestWithWeb3Provider;
