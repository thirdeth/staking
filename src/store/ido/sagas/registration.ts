import { call } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { put, takeLatest } from 'typed-redux-saga';
import { getToastMessage } from 'utils';

import { onRegistrationToIdo } from '../actions';
import actionTypes from '../actionTypes';

export function* registrationSaga({ type, payload: { address, pk } }: ReturnType<typeof onRegistrationToIdo>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.registrationToIdo, { address, pk });

    if (data.response.length) {
      getToastMessage('info', data.response);
    }

    yield* put(apiActions.success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.REGISTRATION_TO_IDO, registrationSaga);
}
