import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import userActionTypes from 'store/user/actionTypes';
import { getTokenBalanceSaga } from 'store/user/sagas/getTokenBalance';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { Erc20Abi, IdoFarmeAbi } from 'types/contracts';
import { getContractDataByItsName, getToastMessage, toDecimals } from 'utils';

import { approveSaga } from '../../user/sagas/approve';
import { onInvest } from '../actions';
import actionTypes from '../actionTypes';

export function* investSaga({
  type,
  payload: { web3Provider, amount, idoId, withWeights, proof },
}: ReturnType<typeof onInvest>) {
  yield put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [tokenAbi, tokenContractAddress] = getContractDataByItsName(ContractsNames.token, chainType);
  const [idoFarmeAbi, idoFarmeContractAddress] = getContractDataByItsName(ContractsNames.idoFarme, chainType);

  try {
    const idoFarmeContract: IdoFarmeAbi = yield new web3Provider.eth.Contract(idoFarmeAbi, idoFarmeContractAddress);
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(tokenAbi, tokenContractAddress);

    yield call(approveSaga, {
      type: userActionTypes.APPROVE,
      payload: {
        web3Provider,
        spenderAddress: tokenContractAddress,
        tokenAddress: idoFarmeContractAddress,
        amount,
      },
    });
    const decimals = yield* call(tokenContract.methods.decimals().call);
    const amountWithDecimals = toDecimals(amount, +decimals);

    yield call(idoFarmeContract.methods.invest(idoId, idoId, proof).send, {
      from: address,
      to: idoFarmeContractAddress,
      value: 123,
    });

    yield call(getTokenBalanceSaga, {
      type: userActionTypes.GET_TOKEN_BALANCE,
      payload: { web3Provider },
    });

    yield put(success(type));
    getToastMessage('success', notifyText.invest.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.invest.error);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.INVEST, investSaga);
}
