/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from 'bn.js';
import type { ContractOptions } from 'web3-eth-contract';
import type { EventLog } from 'web3-core';
import type { EventEmitter } from 'events';
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from './types';

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type AddIdo = ContractEventLog<{
  idoId: string;
  sellStart: string;
  0: string;
  1: string;
}>;
export type Claim = ContractEventLog<{
  idoId: string;
  amount: string;
  0: string;
  1: string;
}>;
export type Invest = ContractEventLog<{
  idoId: string;
  bought: string;
  totalBought: string;
  0: string;
  1: string;
  2: string;
}>;
export type LiquidityAdded = ContractEventLog<{
  idoId: string;
  totalBought: string;
  totalRaised: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleAdminChanged = ContractEventLog<{
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleGranted = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleRevoked = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type StartSell = ContractEventLog<{
  idoId: string;
  0: string;
}>;

export interface IdoFarmeAbi extends BaseContract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions): IdoFarmeAbi;
  clone(): IdoFarmeAbi;
  methods: {
    BASE(): NonPayableTransactionObject<string>;

    DEFAULT_ADMIN_ROLE(): NonPayableTransactionObject<string>;

    SIGNER_ROLE(): NonPayableTransactionObject<string>;

    addIdo(
      _ido: [
        string,
        string,
        number | string | BN,
        number | string | BN,
        number | string | BN,
        number | string | BN,
        number | string | BN,
        number | string | BN,
      ],
      withWeights: boolean,
      _public: boolean,
      vesting: boolean,
      vestingParams: (number | string | BN)[],
    ): NonPayableTransactionObject<void>;

    addLiquidity(idoId: number | string | BN): NonPayableTransactionObject<void>;

    claimTokens(idoId: number | string | BN): NonPayableTransactionObject<void>;

    deleteIdo(idoId: number | string | BN): NonPayableTransactionObject<void>;

    getBoughts(idoIds: (number | string | BN)[]): NonPayableTransactionObject<string[]>;

    getClaimAmount(idoId: number | string | BN, user: string): NonPayableTransactionObject<string[]>;

    getRoleAdmin(role: string | number[]): NonPayableTransactionObject<string>;

    grantRole(role: string | number[], account: string): NonPayableTransactionObject<void>;

    hasRole(role: string | number[], account: string): NonPayableTransactionObject<boolean>;

    idoParams(arg0: number | string | BN): NonPayableTransactionObject<{
      totalRaised: string;
      totalBought: string;
      0: string;
      1: string;
    }>;

    idos(arg0: number | string | BN): NonPayableTransactionObject<{
      owner: string;
      projectToken: string;
      price: string;
      sellStart: string;
      sellEnd: string;
      softcap: string;
      hardcap: string;
      decimals: string;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
    }>;

    invest(
      idoId: number | string | BN,
      weight: number | string | BN,
      proof: (string | number[])[],
    ): PayableTransactionObject<void>;

    investments(
      arg0: number | string | BN,
      arg1: string,
    ): NonPayableTransactionObject<{
      payed: string;
      bought: string;
      claimed: string;
      0: string;
      1: string;
      2: string;
    }>;

    isLiqAdded(idoId: number | string | BN): NonPayableTransactionObject<boolean>;

    renounceRole(role: string | number[], account: string): NonPayableTransactionObject<void>;

    revokeRole(role: string | number[], account: string): NonPayableTransactionObject<void>;

    staking(): NonPayableTransactionObject<string>;

    startSell(
      idoId: number | string | BN,
      _merkleRoot: string | number[],
      totalWeight: number | string | BN,
    ): NonPayableTransactionObject<void>;

    supportsInterface(interfaceId: string | number[]): NonPayableTransactionObject<boolean>;

    vestingInfo(arg0: number | string | BN): NonPayableTransactionObject<{
      startUnlockPercent: string;
      unlockPercent: string;
      unlockStepTime: string;
      0: string;
      1: string;
      2: string;
    }>;

    weightsInfo(arg0: number | string | BN): NonPayableTransactionObject<{
      investmentsPerWeight: string;
      merkleRoot: string;
      0: string;
      1: string;
    }>;

    withdrawInvestment(idoId: number | string | BN): NonPayableTransactionObject<void>;
  };
  events: {
    AddIdo(cb?: Callback<AddIdo>): EventEmitter;
    AddIdo(options?: EventOptions, cb?: Callback<AddIdo>): EventEmitter;

    Claim(cb?: Callback<Claim>): EventEmitter;
    Claim(options?: EventOptions, cb?: Callback<Claim>): EventEmitter;

    Invest(cb?: Callback<Invest>): EventEmitter;
    Invest(options?: EventOptions, cb?: Callback<Invest>): EventEmitter;

    LiquidityAdded(cb?: Callback<LiquidityAdded>): EventEmitter;
    LiquidityAdded(options?: EventOptions, cb?: Callback<LiquidityAdded>): EventEmitter;

    RoleAdminChanged(cb?: Callback<RoleAdminChanged>): EventEmitter;
    RoleAdminChanged(options?: EventOptions, cb?: Callback<RoleAdminChanged>): EventEmitter;

    RoleGranted(cb?: Callback<RoleGranted>): EventEmitter;
    RoleGranted(options?: EventOptions, cb?: Callback<RoleGranted>): EventEmitter;

    RoleRevoked(cb?: Callback<RoleRevoked>): EventEmitter;
    RoleRevoked(options?: EventOptions, cb?: Callback<RoleRevoked>): EventEmitter;

    StartSell(cb?: Callback<StartSell>): EventEmitter;
    StartSell(options?: EventOptions, cb?: Callback<StartSell>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: 'AddIdo', cb: Callback<AddIdo>): void;
  once(event: 'AddIdo', options: EventOptions, cb: Callback<AddIdo>): void;

  once(event: 'Claim', cb: Callback<Claim>): void;
  once(event: 'Claim', options: EventOptions, cb: Callback<Claim>): void;

  once(event: 'Invest', cb: Callback<Invest>): void;
  once(event: 'Invest', options: EventOptions, cb: Callback<Invest>): void;

  once(event: 'LiquidityAdded', cb: Callback<LiquidityAdded>): void;
  once(event: 'LiquidityAdded', options: EventOptions, cb: Callback<LiquidityAdded>): void;

  once(event: 'RoleAdminChanged', cb: Callback<RoleAdminChanged>): void;
  once(event: 'RoleAdminChanged', options: EventOptions, cb: Callback<RoleAdminChanged>): void;

  once(event: 'RoleGranted', cb: Callback<RoleGranted>): void;
  once(event: 'RoleGranted', options: EventOptions, cb: Callback<RoleGranted>): void;

  once(event: 'RoleRevoked', cb: Callback<RoleRevoked>): void;
  once(event: 'RoleRevoked', options: EventOptions, cb: Callback<RoleRevoked>): void;

  once(event: 'StartSell', cb: Callback<StartSell>): void;
  once(event: 'StartSell', options: EventOptions, cb: Callback<StartSell>): void;
}