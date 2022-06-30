import { contractsConfig, ContractsNames } from 'services/WalletService/config';
import { Chains, IChainType } from 'types';
import { AbiItem } from 'web3-utils';

export const getContractDataByItsName = (
  name: ContractsNames,
  chainType: IChainType,
  nertwork = Chains.Cronos,
): [AbiItem[], string] => {
  const { abi: contractAbi, address: contractAddress } =
    contractsConfig.contracts[name][chainType ? 'mainnet' : 'testnet'];

  return [contractAbi as AbiItem[], contractAddress[nertwork]];
};
