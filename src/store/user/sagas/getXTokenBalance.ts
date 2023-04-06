import { select } from 'redux-saga/effects';
import { contractsConfig, ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { Erc20Abi } from 'types/contracts';
import { fromDecimals } from 'utils';

import { getXTokenBalance } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getXTokenBalanceSaga({ type, payload: { web3Provider } }: ReturnType<typeof getXTokenBalance>) {
  yield put(request(type));
  const { address: userAddress, network, chainType }: UserState = yield select(userSelector.getUser);

  const { address: tokenContractAddress, abi: tokenAbi } = contractsConfig.contracts[ContractsNames.xtoken][chainType];
  try {
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(tokenAbi, tokenContractAddress[network]);

    if (userAddress) {
      const balance = yield* call(tokenContract.methods.balanceOf(userAddress).call);
      const decimals = yield* call(tokenContract.methods.decimals().call);

      yield put(updateUserState({ tokenBalance: fromDecimals(balance, +decimals) }));
      yield put(success(type));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_XTOKEN_BALANCE, getXTokenBalanceSaga);
}
