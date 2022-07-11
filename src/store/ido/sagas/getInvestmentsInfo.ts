import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import idoSelector from 'store/ido/selectors';
import userSelector from 'store/user/selectors';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { IdoState, UserState } from 'types';
import { IdoFarmeAbi } from 'types/contracts';
import { getContractDataByItsName } from 'utils';

import { getInvestmentsInfo } from '../actions';
import actionTypes from '../actionTypes';
import { updateIdoState } from '../reducer';

export function* getInvestmentsInfoSaga({
  type,
  payload: { web3Provider, idoId },
}: ReturnType<typeof getInvestmentsInfo>) {
  yield put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const { userInfo }: IdoState = yield select(idoSelector.getIdo);
  const [idoFarmeAbi, idoFarmeContractAddress] = getContractDataByItsName(ContractsNames.idoFarme, chainType);

  try {
    const idoFarmeContract: IdoFarmeAbi = yield new web3Provider.eth.Contract(idoFarmeAbi, idoFarmeContractAddress);

    const { claimed, bought, payed } = yield* call(idoFarmeContract.methods.investments(idoId, address).call);
    const claimAmount = yield* call(idoFarmeContract.methods.getClaimAmount(idoId, address).call);

    yield put(updateIdoState({ userInfo: { ...userInfo, claimed, bought, payed, claimAmount } }));

    yield put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_INVESTMENTS_INFO, getInvestmentsInfoSaga);
}
