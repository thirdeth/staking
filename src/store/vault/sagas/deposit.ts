import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import userActionTypes from 'store/user/actionTypes';
import { updateUserDataSaga } from 'store/user/sagas/updateUserData';
import userSelector from 'store/user/selectors';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { Erc20Abi, VaultAbi } from 'types/contracts';
import { UpdateUserProps } from 'types/requests';
import { getContractDataByItsName, getToastMessage, toDecimals } from 'utils';

import { approveSaga } from '../../user/sagas/approve';
import { onDeposit } from '../actions';
import actionTypes from '../actionTypes';

export function* depositSaga({ type, payload: { web3Provider, amount } }: ReturnType<typeof onDeposit>) {
  yield* put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [tokenAbi, tokenContractAddress] = getContractDataByItsName(ContractsNames.xtoken, chainType);
  const [vaultAbi, vaultContractAddress] = getContractDataByItsName(ContractsNames.vault, chainType);

  try {
    const vaultContract: VaultAbi = yield new web3Provider.eth.Contract(vaultAbi, vaultContractAddress);
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(tokenAbi, tokenContractAddress);

    yield call(approveSaga, {
      type: userActionTypes.APPROVE,
      payload: {
        web3Provider,
        spenderAddress: tokenContractAddress,
        tokenAddress: vaultContractAddress,
        amount,
      },
    });
    const decimals: string = yield call(tokenContract.methods.decimals().call);
    const amountWithDecimals = toDecimals(amount, +decimals);

    yield call(vaultContract.methods.deposit(amountWithDecimals).send, {
      from: address,
      to: vaultContractAddress,
    });

    yield call(updateUserDataSaga, {
      type: userActionTypes.UPDATE_USER_DATA,
      payload: {
        web3Provider,
        updateParams: ['xtokenBalance', 'nativeBalance'] as UpdateUserProps[],
      },
    });

    yield* put(success(type));
    getToastMessage('success', notifyText.deposit.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.deposit.error);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.DEPOSIT, depositSaga);
}
