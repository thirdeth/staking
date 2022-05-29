import { toast } from 'react-toastify';
import { erc20Abi } from 'config/abi';
import { notifyText } from 'config/constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTokenAmount } from 'utils';
import { AbiItem } from 'web3-utils';

import { approve } from '../actions';
import actionTypes from '../actionTypes';
import userSelector from '../selectors';

export function* approveSaga({
  type,
  payload: { web3Provider, spender, amount, decimals, tokenAddress },
}: ReturnType<typeof approve>) {
  yield put(apiActions.request(type));
  const myAddress = yield select(userSelector.getProp('address'));
  const amountWithDecimals = getTokenAmount(amount, decimals);

  try {
    const tokenContract = yield new web3Provider.eth.Contract(erc20Abi as AbiItem[], spender);
    const allowance = yield call(tokenContract.methods.allowance(myAddress, tokenAddress).call);

    if (+allowance < +amountWithDecimals) {
      yield call(tokenContract.methods.approve(tokenAddress, amountWithDecimals).send, {
        from: myAddress,
        to: spender,
      });
      toast.success(notifyText.approve.success);
    }

    yield put(apiActions.success(type));
  } catch (err) {
    toast.error(notifyText.approve.error);
    console.log(err);
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}
