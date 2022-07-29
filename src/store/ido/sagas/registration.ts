import { call } from 'redux-saga/effects';
import { notifyText } from 'services/WalletService/config/constants';
import apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { put, takeLatest } from 'typed-redux-saga';
import { getToastMessage } from 'utils';

import { onRegistrationToIdo } from '../actions';
import actionTypes from '../actionTypes';

import { getInvestmentsInfoSaga } from './getInvestmentsInfo';

export function* registrationSaga({
  type,
  payload: { web3Provider, address, pk, idoIncrement, vesting },
}: ReturnType<typeof onRegistrationToIdo>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.registrationToIdo, { address, pk });

    if (data?.response?.length) {
      getToastMessage('info', data.response);
    } else {
      getToastMessage('success', notifyText.registration.success);
    }

    // update investments info
    yield call(getInvestmentsInfoSaga, {
      type: actionTypes.GET_INVESTMENTS_INFO,
      payload: {
        web3Provider,
        idoId: pk.toString(),
        idoIncrement,
        vesting,
      },
    });

    yield* put(apiActions.success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.registration.error);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.REGISTRATION_TO_IDO, registrationSaga);
}
