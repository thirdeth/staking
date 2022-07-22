import { getClearPoolsInfo } from 'modules/staking/utils';
import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { all, call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { StakingAbi } from 'types/contracts';
import { getContractDataByItsName } from 'utils';

import { getPoolsInfo } from '../actions';
import actionTypes from '../actionTypes';
import { updateStakingState } from '../reducer';

export function* getPoolsInfoSaga({ type, payload: { web3Provider } }: ReturnType<typeof getPoolsInfo>) {
  yield* put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [stakingAbi, stakingContractAddress] = getContractDataByItsName(ContractsNames.staking, chainType);

  try {
    const stakingContract: StakingAbi = yield new web3Provider.eth.Contract(stakingAbi, stakingContractAddress);

    if (address) {
      const poolsInfoArrDirty = yield* all([
        call(stakingContract.methods.pools(0).call),
        call(stakingContract.methods.pools(1).call),
        call(stakingContract.methods.pools(2).call),
      ]);
      const poolsInfoArrClear = getClearPoolsInfo(poolsInfoArrDirty);
      yield* put(
        updateStakingState({
          poolsInfo: poolsInfoArrClear,
        }),
      );

      yield* put(success(type));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_POOLS_INFO, getPoolsInfoSaga);
}
