import { call } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import idoSelector from 'store/ido/selectors';
import { put, select, takeLatest } from 'typed-redux-saga';
import { IdoState } from 'types';

import { getUserAllocation } from '../actions';
import actionTypes from '../actionTypes';
import { updateIdoState } from '../reducer';

export function* getUserAllocationSaga({ type, payload: { address, pk } }: ReturnType<typeof getUserAllocation>) {
  yield* put(apiActions.request(type));

  const { userInfo }: IdoState = yield select(idoSelector.getProp('userInfo'));

  try {
    const { data } = yield call(baseApi.getUserAllocation, { address, pk });

    // if user registered, response will be equal 0 or more then 0
    if (data.response >= 0) {
      yield put(updateIdoState({ userInfo: { ...userInfo, userAllocation: data.response.toString() } }));
    }

    yield* put(apiActions.success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_USER_ALLOCATION, getUserAllocationSaga);
}
