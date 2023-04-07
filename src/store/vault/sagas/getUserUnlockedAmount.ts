import { ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import userSelector from 'store/user/selectors';
import { all, call, put, select, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { VaultAbi } from 'types/contracts';
import { fromDecimals, getContractDataByItsName } from 'utils';

import { getUserUnlockedAmount } from '../actions';
import actionTypes from '../actionTypes';
import { updateVaultState } from '../reducer';

export function* getUserUnlockedAmountSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getUserUnlockedAmount>) {
  yield put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [vaultAbi, vaultContractAddress] = getContractDataByItsName(ContractsNames.vault, chainType);

  try {
    const vaultContract: VaultAbi = yield new web3Provider.eth.Contract(vaultAbi, vaultContractAddress);

    if (address) {
      const userUnlockedAmount = yield* call(vaultContract.methods.getUserUnlockedValue(address).call);

      yield put(
        updateVaultState({
          userUnlockedAmount: fromDecimals(userUnlockedAmount),
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
  yield takeLatest(actionTypes.GET_USER_LOCKED_AMOUNT, getUserUnlockedAmountSaga);
}
