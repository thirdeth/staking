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
          [Chains.Arbitrum]: '0x5Dc383A282E8Ed1280D781EE0547616a737e39B2',
        },
        abi: stakingAbi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Arbitrum]: '',
        },
        abi: stakingAbi as AbiItem[],
      },
    },
    [ContractsNames.token]: {
      testnet: {
        address: {
          [Chains.Arbitrum]: '0x845e4145F7de2822d16FE233Ecd0181c61f1d65F',
        },
        abi: erc20Abi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Arbitrum]: '',
        },
        abi: erc20Abi as AbiItem[],
      },
    },
    [ContractsNames.idoFarme]: {
      testnet: {
        address: {
          [Chains.Arbitrum]: '0x8C6f64642bc9433D57C505A448248f445F7DDee7',
        },
        abi: idoFarmeAbi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Arbitrum]: '',
        },
        abi: idoFarmeAbi as AbiItem[],
      },
    },
  },
};
