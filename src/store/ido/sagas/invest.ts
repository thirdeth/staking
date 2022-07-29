import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { getTotalBoughtSaga } from 'store/ido/sagas/getTotalBought';
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

export function* investSaga({ type, payload: { web3Provider, amount } }: ReturnType<typeof onInvest>) {
  yield* put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const { idoIncrement, id, withWeights, decimals } = yield select(idoSelector.getProp('currentIdo'));
  const [idoFarmeAbi, idoFarmeContractAddress] = getContractDataByItsName(ContractsNames.idoFarme, chainType);

  const amountWithDecimals = toDecimals(amount, +decimals);

  try {
    const idoFarmeContract: IdoFarmeAbi = yield new web3Provider.eth.Contract(idoFarmeAbi, idoFarmeContractAddress);

    const { data } = yield* call(baseApi.getProof, { address, ido_id: id });

    const weight = withWeights ? data.response.weight.toString() : '0';
    const proof = withWeights ? data.response.proof : [];

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

    yield* call(getTotalBoughtSaga, {
      type: actionTypes.GET_TOTAL_BOUGHT,
      payload: {
        web3Provider,
        idoIncrement,
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
