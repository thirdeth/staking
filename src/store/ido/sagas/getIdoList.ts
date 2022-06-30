import { call } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { put, takeLatest } from 'typed-redux-saga';

import { getIdoList } from '../actions';
import actionTypes from '../actionTypes';
import { updateIdoState } from '../reducer';

export function* getIdoListSaga({ type, payload }: ReturnType<typeof getIdoList>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.getIdoList, payload.publicVar, payload.statusVar);

    yield put(updateIdoState({ ido: data }));

    yield* put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_IDO_LIST, getIdoListSaga);
}
