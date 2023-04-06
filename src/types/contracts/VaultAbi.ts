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

export type Deposit = ContractEventLog<{
  user: string;
  amount: string;
  0: string;
  1: string;
}>;
export type Withdraw = ContractEventLog<{
  user: string;
  amount: string;
  0: string;
  1: string;
}>;

export interface VaultAbi extends BaseContract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions): VaultAbi;
  clone(): VaultAbi;
  methods: {
    LOCK_TIME(): NonPayableTransactionObject<string>;

    arsh(): NonPayableTransactionObject<string>;

    deposit(_amount: number | string | BN): NonPayableTransactionObject<void>;

    getUserLockedAmount(_user: string): NonPayableTransactionObject<string>;

    getUserUnlockedValue(_user: string): NonPayableTransactionObject<string>;

    userToDepositInfo(
      arg0: string,
      arg1: number | string | BN,
    ): NonPayableTransactionObject<{
      amount: string;
      timestamp: string;
      resolved: boolean;
      0: string;
      1: string;
      2: boolean;
    }>;

    withdraw(): NonPayableTransactionObject<void>;

    xarsh(): NonPayableTransactionObject<string>;
  };
  events: {
    Deposit(cb?: Callback<Deposit>): EventEmitter;
    Deposit(options?: EventOptions, cb?: Callback<Deposit>): EventEmitter;

    Withdraw(cb?: Callback<Withdraw>): EventEmitter;
    Withdraw(options?: EventOptions, cb?: Callback<Withdraw>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: 'Deposit', cb: Callback<Deposit>): void;
  once(event: 'Deposit', options: EventOptions, cb: Callback<Deposit>): void;

  once(event: 'Withdraw', cb: Callback<Withdraw>): void;
  once(event: 'Withdraw', options: EventOptions, cb: Callback<Withdraw>): void;
}
