import { toast } from 'react-toastify';
import { erc20Abi } from 'config/abi';
import { notifyText } from 'config/constants';
import { takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { call, put, select } from 'typed-redux-saga';
import { Erc20Abi } from 'types';
import { convertToDecimalsAmount } from 'utils';
import { AbiItem } from 'web3-utils';

import { approve } from '../actions';
import actionTypes from '../actionTypes';
import userSelector from '../selectors';

export function* approveSaga({
  type,
  payload: { web3Provider, spender, amount, decimals, tokenAddress },
}: ReturnType<typeof approve>) {
  yield put(request(type));
  const myAddress: string = yield select(userSelector.getProp('address'));
  const amountWithDecimals = convertToDecimalsAmount(amount, decimals);

  try {
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(erc20Abi as AbiItem[], spender);
    const allowance: string = yield call(tokenContract.methods.allowance(myAddress, tokenAddress).call);

    if (+allowance < +amountWithDecimals) {
      yield call(tokenContract.methods.approve(tokenAddress, amountWithDecimals as string).send, {
        from: myAddress,
        to: spender,
      });
      toast.success(notifyText.approve.success);
    }

    yield put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    toast.error(notifyText.approve.error);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}
