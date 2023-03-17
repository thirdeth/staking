import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { call, put, takeLatest } from 'typed-redux-saga';

import { getIdoById } from '../actions';
import actionTypes from '../actionTypes';
import { updateIdoState } from '../reducer';

export function* getIdoByIdSaga({ type, payload: { id } }: ReturnType<typeof getIdoById>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.getIdoById, id);

    yield* put(updateIdoState({ currentIdo: data }));
    yield* put(apiActions.success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_IDO_BY_ID, getIdoByIdSaga);
}
