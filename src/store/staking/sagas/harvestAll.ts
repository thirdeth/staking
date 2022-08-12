import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import { updateUserDataSaga } from 'store/user/sagas/updateUserData';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { StakingAbi } from 'types/contracts';
import { UpdateUserProps } from 'types/requests';
import { getContractDataByItsName, getToastMessage } from 'utils';

import userActionTypes from '../../user/actionTypes';
import { onHarvestAll } from '../actions';
import actionTypes from '../actionTypes';

// import { getUserStakesSaga } from './getUserStakes';

export function* harvestAllSaga({ type, payload: { web3Provider } }: ReturnType<typeof onHarvestAll>) {
  yield put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [stakingAbi, stakingContractAddress] = getContractDataByItsName(ContractsNames.staking, chainType);

  try {
    const stakingContract: StakingAbi = yield new web3Provider.eth.Contract(stakingAbi, stakingContractAddress);

    yield call(stakingContract.methods.harvestAll().send, {
      from: address,
    });

    yield call(updateUserDataSaga, {
      type: userActionTypes.UPDATE_USER_DATA,
      payload: {
        web3Provider,
        updateParams: ['userStakes'] as UpdateUserProps[],
      },
    });

    yield put(success(type));
    getToastMessage('success', notifyText.harvest.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.harvest.error);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.HARVEST_ALL, harvestAllSaga);
}
