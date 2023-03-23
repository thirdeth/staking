import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { StakingAbi, UserState } from 'types';
import { createContract, getContractDataByItsName } from 'utils';

import { getTvlAndApr } from '../actions';
import actionTypes from '../actionTypes';
import { updateStakingState } from '../reducer';

export function* getTvlAndAprSaga({ type }: ReturnType<typeof getTvlAndApr>) {
  yield put(request(type));
  const { chainType, network }: UserState = yield select(userSelector.getUser);
  const [stakingAbi, stakingContractAddress] = getContractDataByItsName(ContractsNames.staking, chainType);

  try {
    const stakingContract: StakingAbi = yield createContract(stakingContractAddress, stakingAbi, network, chainType); // ;yield new web3Provider.eth.Contract(stakingAbi, stakingContractAddress);
    const data = yield* call(stakingContract.methods.pools(0).call);
    console.log({ data });
    // yield put(
    //   updateStakingState({
    //     topInvestors: data,
    //   }),
    // );

    yield put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TVL_AND_APR, getTvlAndAprSaga);
}
