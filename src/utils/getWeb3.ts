import { chains } from 'services/WalletService/config';
import { Chains, IChainType } from 'types';
import Web3 from 'web3';

export const getWeb3 = async (chainName: Chains, chainType: IChainType) => {
  const { chainId } = chains[Chains[chainName]][chainType];
  const rpcUrl = chains[Chains[chainName]][chainType].provider.WalletConnect.provider.rpc.rpc[chainId];
  return new Web3(rpcUrl);
};
