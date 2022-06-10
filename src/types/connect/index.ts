import { INetwork, IProvider, ISettings } from '@amfi/connect-wallet/src/interface';
import { ContractsNames } from 'config';
import { AbiItem } from 'web3-utils';

export enum Chains {
  bsc = 'Binance-Smart-Chain',
}
export type IChainType = 'testnet' | 'mainnet';

export interface IConnectWallet {
  network: INetwork;
  provider: {
    [index: string]: IProvider;
  };
  settings: ISettings;
}

export interface IChainConfig {
  name: string;
  id: number;
  rpc: string;
  tx: {
    link: string;
  };
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExp: string;
}

export interface IContracts {
  decimals: number;
  names: string[];
  contracts: {
    [key in ContractsNames]: {
      testnet: {
        address: {
          [chainKey in Chains]: string;
        };
        abi: AbiItem[];
      };
      mainnet: {
        address: {
          [chainKey in Chains]: string;
        };
        abi: AbiItem[];
      };
    };
  };
}
