import { ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import idoSelector from 'store/ido/selectors';
import userSelector from 'store/user/selectors';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { IdoState, UserState, VestingInfoProps } from 'types';
import { IdoFarmeAbi } from 'types/contracts';
import { getContractDataByItsName } from 'utils';

import { getTotalBought } from '../actions';
import actionTypes from '../actionTypes';
import { updateIdoState } from '../reducer';

export function* getTotalBoughtSaga({
  type,
  payload: { web3Provider, idoIncrement },
}: ReturnType<typeof getTotalBought>) {
  yield* put(request(type));
  const { chainType }: UserState = yield select(userSelector.getUser);
  const userInfo: IdoState['userInfo'] = yield select(idoSelector.getProp('userInfo'));
  const [idoFarmeAbi, idoFarmeContractAddress] = getContractDataByItsName(ContractsNames.idoFarme, chainType);

  try {
    const idoFarmeContract: IdoFarmeAbi = yield new web3Provider.eth.Contract(idoFarmeAbi, idoFarmeContractAddress);

    const { totalBought } = yield* call(idoFarmeContract.methods.idoParams(idoIncrement).call);

    yield* put(updateIdoState({ userInfo: { ...userInfo, totalBought } }));

    yield* put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOTAL_BOUGHT, getTotalBoughtSaga);
}
