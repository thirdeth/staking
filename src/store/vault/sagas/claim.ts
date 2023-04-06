import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import { updateUserDataSaga } from 'store/user/sagas/updateUserData';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { VaultAbi } from 'types/contracts';
import { UpdateUserProps } from 'types/requests';
import { getContractDataByItsName, getToastMessage } from 'utils';

import userActionTypes from '../../user/actionTypes';
import { onClaim } from '../actions';
import actionTypes from '../actionTypes';

export function* withdrawSaga({ type, payload: { web3Provider } }: ReturnType<typeof onClaim>) {
  yield put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [vaultAbi, vaultContractAddress] = getContractDataByItsName(ContractsNames.vault, chainType);

  try {
    const vaultContract: VaultAbi = yield new web3Provider.eth.Contract(vaultAbi, vaultContractAddress);

    yield call(vaultContract.methods.withdraw().send, {
      from: address,
    });

    yield call(updateUserDataSaga, {
      type: userActionTypes.UPDATE_USER_DATA,
      payload: {
        web3Provider,
        updateParams: ['tokenBalance', 'nativeBalance'] as UpdateUserProps[],
      },
    });
    yield put(success(type));
    getToastMessage('success', notifyText.withdraw.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.withdraw.error);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CLAIM, withdrawSaga);
}
