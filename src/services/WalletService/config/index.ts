import { Chains, IChainType, IConnectWallet, IContracts } from 'types';
import { AbiItem } from 'web3-utils';

import { erc20Abi, idoFarmeAbi, stakingAbi, vaultAbi } from './abi';

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
  vault,
  token,
  xtoken,
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
          [Chains.Arbitrum]: '0x09C81Dd256a9340795593fB18def58f7E3Ece191',
        },
        abi: stakingAbi as AbiItem[],
      },
    },
    [ContractsNames.vault]: {
      testnet: {
        address: {
          [Chains.Arbitrum]: '0x2Ed2f75FC7489785f23a6b95A94CA9e006903c47',
        },
        abi: vaultAbi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Arbitrum]: '0x2Ed2f75FC7489785f23a6b95A94CA9e006903c47',
        },
        abi: vaultAbi as AbiItem[],
      },
    },
    [ContractsNames.token]: {
      testnet: {
        address: {
          [Chains.Arbitrum]: '0x4e1b1c450cebc7a4e1561e8edd99a8c650dfb1a9',
        },
        abi: erc20Abi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Arbitrum]: '0x4e1b1c450cebc7a4e1561e8edd99a8c650dfb1a9',
        },
        abi: erc20Abi as AbiItem[],
      },
    },
    [ContractsNames.xtoken]: {
      testnet: {
        address: {
          [Chains.Arbitrum]: '0x32b51473bdab546bb4df0662433585c8d584c233',
        },
        abi: erc20Abi as AbiItem[],
      },
      mainnet: {
        address: {
          [Chains.Arbitrum]: '0x32b51473bdab546bb4df0662433585c8d584c233',
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
