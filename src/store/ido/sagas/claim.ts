import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import idoSelector from 'store/ido/selectors';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { IdoState, UserState } from 'types';
import { IdoFarmeAbi } from 'types/contracts';
import { getContractDataByItsName, getToastMessage } from 'utils';

import { onClaim } from '../actions';
import actionTypes from '../actionTypes';
import { updateIdoState } from '../reducer';

export function* claimSaga({ type, payload: { web3Provider, idoIncrement } }: ReturnType<typeof onClaim>) {
  yield* put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const { userInfo }: IdoState = yield select(idoSelector.getIdo);
  const [idoFarmeAbi, idoFarmeContractAddress] = getContractDataByItsName(ContractsNames.idoFarme, chainType);

  try {
    const idoFarmeContract: IdoFarmeAbi = yield new web3Provider.eth.Contract(idoFarmeAbi, idoFarmeContractAddress);

    yield* call(idoFarmeContract.methods.claimTokens(idoIncrement).send, {
      from: address,
      to: idoFarmeContractAddress,
    });

    const claimAmount = yield* call(idoFarmeContract.methods.getClaimAmount(idoIncrement, address).call);
    yield* put(updateIdoState({ userInfo: { ...userInfo, claimAmount } }));

    yield* put(success(type));
    getToastMessage('success', notifyText.claim.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.claim.error);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CLAIM, claimSaga);
}
