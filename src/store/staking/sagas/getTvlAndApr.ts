import BigNumber from 'bignumber.js/bignumber';
import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { StakingAbi, UserState } from 'types';
import { createContract, fromDecimals, getContractDataByItsName } from 'utils';

import { getTvlAndApr } from '../actions';
import actionTypes from '../actionTypes';
import { updateStakingState } from '../reducer';

export function* getTvlAndAprSaga({ type }: ReturnType<typeof getTvlAndApr>) {
  yield put(request(type));
  const { chainType, network }: UserState = yield select(userSelector.getUser);
  const [stakingAbi, stakingContractAddress] = getContractDataByItsName(ContractsNames.staking, chainType);

  try {
    const stakingContract: StakingAbi = yield createContract(stakingContractAddress, stakingAbi, network, chainType); // ;yield new web3Provider.eth.Contract(stakingAbi, stakingContractAddress);
    const tvlAndAprData = yield* call(stakingContract.methods.getTvlAndApr().call);
    const numberOfStakers = yield* call(stakingContract.methods.numOfStakers().call);
    yield put(
      updateStakingState({
        tvl: fromDecimals(tvlAndAprData[0], 18),
        apr: fromDecimals(new BigNumber(tvlAndAprData[1]).multipliedBy(525600).toString(), 18),
        numberOfStakers,
      }),
    );

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
