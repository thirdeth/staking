import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { call, put, takeLatest } from 'typed-redux-saga';

import { getUserStakes } from '../actions';
import actionTypes from '../actionTypes';
import { updateStakingState } from '../reducer';

export function* getTopInvestorsSaga({ type }: ReturnType<typeof getUserStakes>) {
  yield put(request(type));
  try {
    const { data } = yield call(baseApi.getTopInvestors);

    yield put(
      updateStakingState({
        topInvestors: data,
      }),
    );

    yield put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOP_INVESTORS, getTopInvestorsSaga);
}
