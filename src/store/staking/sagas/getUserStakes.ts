import { ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { all, call, put, select, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { StakingAbi } from 'types/contracts';
import { fromDecimals, getContractDataByItsName } from 'utils';

import { getUserStakes } from '../actions';
import actionTypes from '../actionTypes';
import { updateStakingState } from '../reducer';

export function* getUserStakesSaga({ type, payload: { web3Provider } }: ReturnType<typeof getUserStakes>) {
  yield put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [stakingAbi, stakingContractAddress] = getContractDataByItsName(ContractsNames.staking, chainType);

  try {
    const stakingContract: StakingAbi = yield new web3Provider.eth.Contract(stakingAbi, stakingContractAddress);

    if (address) {
      // get array of main info per user stake
      const userStakesPartInfo = yield* call(stakingContract.methods.getFront(address).call);
      // get reward amounts array
      const rewardAmountsPerStakes = yield* all(
        userStakesPartInfo.map((_, depositIndex) =>
          call(stakingContract.methods.getRewardAmount(address, depositIndex).call),
        ),
      );

      const userStakes = userStakesPartInfo.map((stake, index) => [...stake, rewardAmountsPerStakes[index]]);
      const { totalStakedAmount } = yield* call(stakingContract.methods.addressToUserInfo(address).call);

      yield put(
        updateStakingState({
          userStakes: userStakes as string[][],
          totalStakedAmount: fromDecimals(totalStakedAmount),
        }),
      );
      yield put(success(type));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_USER_STAKES, getUserStakesSaga);
}
