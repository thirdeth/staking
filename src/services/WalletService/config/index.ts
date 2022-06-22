import { Chains, IChainType, IConnectWallet, IContracts } from 'types';
import { AbiItem } from 'web3-utils';

import { erc20Abi } from './abi';

export const chains: {
  [key: string]: {
    [key: string]: {
      name: string;
      nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
      };
      rpc: string;
      blockExplorerUrl: string;
      chainId: number;
      provider: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      };

      img?: string;
    };
  };
} = {
  Cronos: {
    mainnet: {
      name: 'Cronos Mainnet',
      chainId: 25,
      nativeCurrency: {
        name: 'CRO',
        symbol: 'CRO',
        decimals: 18,
      },
      rpc: 'https://evm.cronos.org',
      blockExplorerUrl: 'https://cronos.org/explorer',
      provider: {
        MetaMask: { name: 'MetaMask' },
        WalletConnect: {
          name: 'WalletConnect',
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                25: 'https://cronos.org/explorer',
              },
              chainId: 25,
            },
          },
        },
      },
    },
    testnet: {
      name: 'Cronos-Testnet',
      chainId: 338,
      nativeCurrency: {
        name: 'TCRO',
        symbol: 'TCRO',
        decimals: 18,
      },
      rpc: 'https://cronos-testnet-3.crypto.org:8545',
      blockExplorerUrl: 'https://cronos.crypto.org/explorer/testnet3',
      provider: {
        MetaMask: { name: 'MetaMask' },
        WalletConnect: {
          name: 'WalletConnect',
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                338: 'https://cronos-testnet-3.crypto.org:8545',
              },
              chainId: 338,
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
      nativeCurrency: chain.nativeCurrency,
      rpc: chain.rpc,
      blockExplorerUrl: chain.blockExplorerUrl,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export enum ContractsNames {
  staking = 'staking',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.staking]: {
      testnet: {
        address: {
          [Chains.Cronos]: '0x658396178d33C91a5C60A1164828e00008769a74',
        },
        abi: erc20Abi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Cronos]: '0x658396178d33C91a5C60A1164828e00008769a74',
        },
        abi: erc20Abi as AbiItem[],
      },
    },
  },
};