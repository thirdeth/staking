import Web3 from 'web3';

export type UpdateUserProps = 'tokenBalance' | 'xtokenBalance' | 'nativeBalance' | 'userStakes' | 'rankId';

export type GetIdoListReq = {
  type: string;
  status: string;
  count: number;
  start: number;
  isMyIdos?: boolean;
  isMyInvesments?: boolean;
  owner?: string;
  investor?: string;
  shouldConcat?: boolean;
};

export type GetIdoByIdReq = {
  id: string;
};

export type RegistrationIdoReq = {
  address: string;
  pk: number;
};
export type GetProofReq = {
  address: string;
  ido_id: number;
};

export type RegistretionIdoWithUpdatesReq = {
  idoIncrement: string;
  vesting: boolean;
} & RegistrationIdoReq &
  RequestWithWeb3Provider;

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

export type DepositReq = {
  amount: string;
} & RequestWithWeb3Provider;

export type InvestReq = {
  amount: string;
} & RequestWithWeb3Provider;

export type ClaimReq = {
  idoIncrement: string;
} & RequestWithWeb3Provider;

export type AddLiquidityReq = {
  idoIncrement: string;
  tokenAddress: string;
  decimals: number;
} & RequestWithWeb3Provider;

export type ChangeUserStakeItemReq = {
  stakeIndex: number;
} & RequestWithWeb3Provider;

export type UpdateUserDataReq = {
  updateParams: UpdateUserProps[];
} & RequestWithWeb3Provider;

export type GetIvestmentsInfoReq = {
  idoId: string;
  idoIncrement: string;
  vesting: boolean;
} & RequestWithWeb3Provider;

export type GetTotalBoughtReq = {
  idoIncrement: string;
} & RequestWithWeb3Provider;

export type GetAddLiquidityTimeReq = {
  idoIncrement: string;
} & RequestWithWeb3Provider;
