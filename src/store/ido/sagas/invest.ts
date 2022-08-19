import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import idoSelector from 'store/ido/selectors';
import userActionTypes from 'store/user/actionTypes';
import { updateUserDataSaga } from 'store/user/sagas/updateUserData';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { IdoFarmeAbi } from 'types/contracts';
import { UpdateUserProps } from 'types/requests';
import { getContractDataByItsName, getToastMessage, toDecimals } from 'utils';

import { onInvest } from '../actions';
import actionTypes from '../actionTypes';

import { getInvestmentsInfoSaga } from './getInvestmentsInfo';

export function* investSaga({ type, payload: { web3Provider, amount } }: ReturnType<typeof onInvest>) {
  yield* put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const { idoIncrement, id, type: idoType, vesting, decimals } = yield select(idoSelector.getProp('currentIdo'));
  const [idoFarmeAbi, idoFarmeContractAddress] = getContractDataByItsName(ContractsNames.idoFarme, chainType);

  const amountWithDecimals = toDecimals(amount, +decimals);

  try {
    const idoFarmeContract: IdoFarmeAbi = yield new web3Provider.eth.Contract(idoFarmeAbi, idoFarmeContractAddress);

    const { data } = yield* call(baseApi.getProof, { address, ido_id: id });

    const weight = idoType !== 'public' ? data.response.weight.toString() : '0';
    const proof = idoType !== 'public' ? data.response.proof : [];

    yield* call(idoFarmeContract.methods.invest(idoIncrement.toString(), weight, proof).send, {
      from: address,
      to: idoFarmeContractAddress,
      value: amountWithDecimals,
    });

    yield* call(updateUserDataSaga, {
      type: userActionTypes.UPDATE_USER_DATA,
      payload: {
        web3Provider,
        updateParams: ['tokenBalance', 'nativeBalance'] as UpdateUserProps[],
      },
    });

    yield* call(getInvestmentsInfoSaga, {
      type: actionTypes.GET_INVESTMENTS_INFO,
      payload: {
        web3Provider,
        idoIncrement,
        idoId: id,
        vesting,
      },
    });

    yield* put(success(type));
    getToastMessage('success', notifyText.invest.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.invest.error);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.INVEST, investSaga);
}
