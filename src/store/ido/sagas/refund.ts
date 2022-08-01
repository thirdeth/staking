import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { IdoFarmeAbi } from 'types/contracts';
import { getContractDataByItsName, getToastMessage } from 'utils';

import { onRefund } from '../actions';
import actionTypes from '../actionTypes';

import { getTotalBoughtSaga } from './getTotalBought';

export function* refundaga({ type, payload: { web3Provider, idoIncrement } }: ReturnType<typeof onRefund>) {
  yield* put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [idoFarmeAbi, idoFarmeContractAddress] = getContractDataByItsName(ContractsNames.idoFarme, chainType);

  try {
    const idoFarmeContract: IdoFarmeAbi = yield new web3Provider.eth.Contract(idoFarmeAbi, idoFarmeContractAddress);

    yield* call(idoFarmeContract.methods.withdrawInvestment(idoIncrement).send, {
      from: address,
      to: idoFarmeContractAddress,
    });

    yield* call(getTotalBoughtSaga, {
      type: actionTypes.GET_TOTAL_BOUGHT,
      payload: {
        web3Provider,
        idoIncrement,
      },
    });

    yield* put(success(type));
    getToastMessage('success', notifyText.refund.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.refund.error);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.REFUND, refundaga);
}
