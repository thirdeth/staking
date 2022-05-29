import { Chains, IChainType, IConnectWallet, IContracts } from 'types';

import { erc20Abi } from './abi';

export const chains: {
  [key: string]: {
    [key: string]: {
      name: string;
      chainId: number;
      provider: {
        [key: string]: any;
      };
      img?: any;
    };
  };
} = {
  'Binance-Smart-Chain': {
    mainnet: {
      name: 'Binance-Smart-Chain',
      chainId: 56,
      provider: {
        MetaMask: { name: 'MetaMask' },
        WalletConnect: {
          name: 'WalletConnect',
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                56: 'https://bsc-dataseed.binance.org/',
              },
              chainId: 56,
            },
          },
        },
      },
    },
    testnet: {
      name: 'Binance-Smart-Chain',
      chainId: 97,
      provider: {
        MetaMask: { name: 'MetaMask' },
        WalletConnect: {
          name: 'WalletConnect',
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
              },
              chainId: 97,
            },
          },
        },
      },
    },
  },
};

export const connectWallet = (newChainName: Chains, type: IChainType): IConnectWallet => {
  const chain = chains[newChainName][type];
  return {
    network: {
      chainName: chain.name,
      chainID: chain.chainId,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export enum ContractsNames {
  totopad = 'totopad',
  totoro = 'totoro',
  fundingToken = 'fundingToken',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.totopad]: {
      testnet: {
        address: {
          [Chains['Binance-Smart-Chain']]: '0x658396178d33C91a5C60A1164828e00008769a74',
        },
        abi: erc20Abi,
      },
      mainnet: {
        address: {
          [Chains['Binance-Smart-Chain']]: '0x658396178d33C91a5C60A1164828e00008769a74',
        },
        abi: erc20Abi,
      },
    },
  },
};
