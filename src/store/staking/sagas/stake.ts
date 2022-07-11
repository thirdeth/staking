import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import userActionTypes from 'store/user/actionTypes';
import { updateUserDataSaga } from 'store/user/sagas/updateUserData';
import userSelector from 'store/user/selectors';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { Erc20Abi, StakingAbi } from 'types/contracts';
import { UpdateUserProps } from 'types/requests';
import { getContractDataByItsName, getToastMessage, toDecimals } from 'utils';

import { approveSaga } from '../../user/sagas/approve';
import { onStake } from '../actions';
import actionTypes from '../actionTypes';

export function* stakeSaga({ type, payload: { web3Provider, amount, poolId } }: ReturnType<typeof onStake>) {
  yield* put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [tokenAbi, tokenContractAddress] = getContractDataByItsName(ContractsNames.token, chainType);
  const [stakingAbi, stakingContractAddress] = getContractDataByItsName(ContractsNames.staking, chainType);

  try {
    const stakingContract: StakingAbi = yield new web3Provider.eth.Contract(stakingAbi, stakingContractAddress);
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(tokenAbi, tokenContractAddress);

    yield call(approveSaga, {
      type: userActionTypes.APPROVE,
      payload: {
        web3Provider,
        spenderAddress: tokenContractAddress,
        tokenAddress: stakingContractAddress,
        amount,
      },
    });
    const decimals: string = yield call(tokenContract.methods.decimals().call);
    const amountWithDecimals = toDecimals(amount, +decimals);

    yield call(stakingContract.methods.stake(poolId, amountWithDecimals).send, {
      from: address,
      to: stakingContractAddress,
    });

    yield call(updateUserDataSaga, {
      type: userActionTypes.UPDATE_USER_DATA,
      payload: {
        web3Provider,
        updateParams: ['tokenBalance', 'nativeBalance', 'userStakes', 'rankId'] as UpdateUserProps[],
      },
    });

    yield* put(success(type));
    getToastMessage('success', notifyText.stake.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.stake.error);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.STAKE, stakeSaga);
}
