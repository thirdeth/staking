import { select } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { error, request, success } from 'store/api/actions';
import userActionTypes from 'store/user/actionTypes';
import { approveSaga } from 'store/user/sagas/approve';
import userSelector from 'store/user/selectors';
import { call, put, takeLatest } from 'typed-redux-saga';
import { UserState } from 'types';
import { IdoFarmeAbi } from 'types/contracts';
import { getContractDataByItsName, getToastMessage } from 'utils';

import { onAddLiquidity } from '../actions';
import actionTypes from '../actionTypes';
import { updateIdoState } from '../reducer';

export function* addLiquiditySaga({
  type,
  payload: { web3Provider, idoIncrement, tokenAddress },
}: ReturnType<typeof onAddLiquidity>) {
  yield* put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const [idoFarmeAbi, idoFarmeContractAddress] = getContractDataByItsName(ContractsNames.idoFarme, chainType);

  try {
    const idoFarmeContract: IdoFarmeAbi = yield new web3Provider.eth.Contract(idoFarmeAbi, idoFarmeContractAddress);

    const { totalBought } = yield* call(idoFarmeContract.methods.idoParams(idoIncrement).call);

    yield call(approveSaga, {
      type: userActionTypes.APPROVE,
      payload: {
        web3Provider,
        spenderAddress: tokenAddress,
        tokenAddress: idoFarmeContractAddress,
        amount: totalBought,
      },
    });

    yield* call(idoFarmeContract.methods.addLiquidity(idoIncrement).send, {
      from: address,
      to: idoFarmeContractAddress,
    });

    const isLiqAdded = yield* call(idoFarmeContract.methods.isLiqAdded(idoIncrement).call);
    yield* put(updateIdoState({ isLiqAdded }));

    yield* put(success(type));
    getToastMessage('success', notifyText.addLiquidity.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    getToastMessage('error', notifyText.addLiquidity.error);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.ADD_LIQUIDITY, addLiquiditySaga);
}
