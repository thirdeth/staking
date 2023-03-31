import { Chains, IChainType, IConnectWallet, IContracts } from 'types';
import { AbiItem } from 'web3-utils';

import { erc20Abi, idoFarmeAbi, stakingAbi } from './abi';

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
  Arbitrum: {
    mainnet: {
      name: 'Arbitrum One',
      chainId: 42161,
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpc: 'https://arb1.arbitrum.io/rpc',
      blockExplorerUrl: 'https://arbiscan.io/',
      provider: {
        MetaMask: { name: 'MetaMask' },
        WalletConnect: {
          name: 'WalletConnect',
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                42161: 'https://arb1.arbitrum.io/rpc',
              },
              chainId: 42161,
            },
          },
        },
      },
    },
    testnet: {
      name: 'Arbitrum Goerli Testnet',
      chainId: 421613,
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpc: 'https://goerli-rollup.arbitrum.io/rpc',
      blockExplorerUrl: 'https://goerli.arbiscan.io/',
      provider: {
        MetaMask: { name: 'MetaMask' },
        WalletConnect: {
          name: 'WalletConnect',
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                421613: 'https://goerli-rollup.arbitrum.io/rpc',
              },
              chainId: 421613,
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
  staking,
  token,
  idoFarme,
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.staking]: {
      testnet: {
        address: {
          [Chains.Arbitrum]: '0xD79572AdC8062E6833835CBD192c2eEf1DB592df',
        },
        abi: stakingAbi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Arbitrum]: '0x8792c7f36E7287102c00C3a6F84B0DdEbCfA3d1a',
        },
        abi: stakingAbi as AbiItem[],
      },
    },
    [ContractsNames.token]: {
      testnet: {
        address: {
          [Chains.Arbitrum]: '0x62A698E0B600251318bD5265089BAEC10fB13C8f',
        },
        abi: erc20Abi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Arbitrum]: '0xb4ba87fce253070C7Ae3f0f7DfA25e7F4995b587',
        },
        abi: erc20Abi as AbiItem[],
      },
    },
    [ContractsNames.idoFarme]: {
      testnet: {
        address: {
          [Chains.Arbitrum]: '0x31cAd89fcEFab990573bF7ef995D4bC734698188',
        },
        abi: idoFarmeAbi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Arbitrum]: '0x8E19c5F759052Ec0f40F50E81740187f0Fb0dC87',
        },
        abi: idoFarmeAbi as AbiItem[],
      },
    },
  },
};
