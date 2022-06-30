import { select } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { fromDecimals } from 'utils';

import { getNativeBalance } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getNativeBalanceSaga({ type, payload: { web3Provider } }: ReturnType<typeof getNativeBalance>) {
  yield put(request(type));
  const { address: userAddress }: UserState = yield select(userSelector.getUser);

  try {
    if (userAddress) {
      const nativeBalance: string = yield web3Provider.eth.getBalance(userAddress);
      yield put(updateUserState({ nativeBalance: fromDecimals(nativeBalance) }));
    }
    yield put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_NATIVE_BALANCE, getNativeBalanceSaga);
}
