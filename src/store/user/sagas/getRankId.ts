import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { StakingAbi } from 'types/contracts';
import { getContractDataByItsName } from 'utils';

import { getRankId } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getRankIdSaga({ type, payload: { web3Provider } }: ReturnType<typeof getRankId>) {
  yield put(request(type));
  const { address: userAddress, chainType }: UserState = yield select(userSelector.getUser);
  const [stakingAbi, stakingContractAddress] = getContractDataByItsName(ContractsNames.staking, chainType);

  try {
    const stakingContract: StakingAbi = yield new web3Provider.eth.Contract(stakingAbi, stakingContractAddress);

    if (userAddress) {
      const { level } = yield* call(stakingContract.methods.addressToUserInfo(userAddress).call);

      yield put(updateUserState({ rankId: level }));
      yield put(success(type));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_RANK_ID, getRankIdSaga);
}
