import { select } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import stakingActionTypes from 'store/staking/actionTypes';
import { getUserStakesSaga } from 'store/staking/sagas/getUserStakes';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';

import { updateUserData } from '../actions';
import actionTypes from '../actionTypes';

import { getNativeBalanceSaga } from './getNativeBalance';
import { getRankIdSaga } from './getRankId';
import { getTokenBalanceSaga } from './getTokenBalance';

export function* updateUserDataSaga({
  type,
  payload: { web3Provider, updateParams },
}: ReturnType<typeof updateUserData>) {
  yield* put(request(type));
  const { address: userAddress }: UserState = yield select(userSelector.getUser);

  try {
    if (!userAddress.length) {
      return;
    }

    if (updateParams.includes('tokenBalance')) {
      yield call(getTokenBalanceSaga, {
        type: actionTypes.GET_TOKEN_BALANCE,
        payload: { web3Provider },
      });
    }
    if (updateParams.includes('nativeBalance')) {
      yield call(getNativeBalanceSaga, {
        type: actionTypes.GET_NATIVE_BALANCE,
        payload: { web3Provider },
      });
    }
    if (updateParams.includes('userStakes')) {
      yield call(getUserStakesSaga, {
        type: stakingActionTypes.GET_USER_STAKES,
        payload: { web3Provider },
      });
    }
    if (updateParams.includes('rankId')) {
      yield call(getRankIdSaga, {
        type: actionTypes.GET_RANK_ID,
        payload: { web3Provider },
      });
    }

    yield* put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.UPDATE_USER_DATA, updateUserDataSaga);
}
