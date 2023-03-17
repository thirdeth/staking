import { Chains, IChainType } from 'types';
import { AbiItem } from 'web3-utils';

import { getWeb3 } from '.';

export const createContract = async (address: string, abi: AbiItem[], chainName: Chains, chainType: IChainType) => {
  const web3 = await getWeb3(chainName, chainType);
  return new web3.eth.Contract(abi, address);
};
