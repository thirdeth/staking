import { select } from 'redux-saga/effects';
import { contractsConfig, ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { Erc20Abi } from 'types/contracts';
import { convertFromDecimalsAmount } from 'utils';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getTokenBalanceSaga({ type, payload: { web3Provider } }: ReturnType<typeof getTokenBalance>) {
  yield put(request(type));
  const { address: userAddress, network, chainType }: UserState = yield select(userSelector.getUser);

  const { address: tokenContractAddress, abi: tokenAbi } = contractsConfig.contracts[ContractsNames.staking][chainType];

  try {
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(tokenAbi, tokenContractAddress[network]);

    if (userAddress) {
      const balance = yield* call(tokenContract.methods.balanceOf(userAddress).call);
      const decimals = yield* call(tokenContract.methods.decimals().call);

      yield put(updateUserState({ tokenBalance: convertFromDecimalsAmount(balance, +decimals) }));
    }

    yield put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}
