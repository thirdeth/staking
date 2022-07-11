import { takeLatest } from 'redux-saga/effects';
import { erc20Abi } from 'services/WalletService/config/abi';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import { call, put, select } from 'typed-redux-saga';
import { Erc20Abi } from 'types';
import { getToastMessage, toDecimals } from 'utils';
import { AbiItem } from 'web3-utils';

import { approve } from '../actions';
import actionTypes from '../actionTypes';
import userSelector from '../selectors';

export function* approveSaga({
  type,
  payload: { web3Provider, spenderAddress, amount, tokenAddress },
}: ReturnType<typeof approve>) {
  yield* put(request(type));
  const myAddress: string = yield select(userSelector.getProp('address'));

  try {
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(erc20Abi as AbiItem[], spenderAddress);
    const decimals = yield* call(tokenContract.methods.decimals().call);
    const amountWithDecimals = toDecimals(amount, +decimals);

    const allowance: string = yield call(tokenContract.methods.allowance(myAddress, tokenAddress).call);
    if (+allowance < +amountWithDecimals) {
      yield call(tokenContract.methods.approve(tokenAddress, amountWithDecimals as string).send, {
        from: myAddress,
        to: spenderAddress,
      });
      getToastMessage('success', notifyText.approve.success);
    }

    yield* put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.approve.error);
    yield* put(error(type));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}
