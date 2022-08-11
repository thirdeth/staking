import { ContractsNames } from 'services/WalletService/config';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import idoSelector from 'store/ido/selectors';
import userSelector from 'store/user/selectors';
import { call, put, select, takeLatest } from 'typed-redux-saga';
import { IdoState, UserState, VestingInfoProps } from 'types';
import { IdoFarmeAbi } from 'types/contracts';
import { getContractDataByItsName } from 'utils';

import { getInvestmentsInfo } from '../actions';
import actionTypes from '../actionTypes';
import { updateIdoState } from '../reducer';

export function* getInvestmentsInfoSaga({
  type,
  payload: { web3Provider, idoId, idoIncrement, vesting },
}: ReturnType<typeof getInvestmentsInfo>) {
  yield* put(request(type));
  const { address, chainType }: UserState = yield select(userSelector.getUser);
  const { userInfo, currentIdo }: IdoState = yield select(idoSelector.getIdo);

  const [idoFarmeAbi, idoFarmeContractAddress] = getContractDataByItsName(ContractsNames.idoFarme, chainType);

  try {
    const idoFarmeContract: IdoFarmeAbi = yield new web3Provider.eth.Contract(idoFarmeAbi, idoFarmeContractAddress);

    let vestingInfo: VestingInfoProps = {
      startUnlockPercent: '',
      unlockPercent: '',
      unlockStepTime: '',
    };

    const { payed } = yield* call(idoFarmeContract.methods.investments(idoIncrement, address).call);
    const claimAmount = yield* call(idoFarmeContract.methods.getClaimAmount(idoIncrement, address).call);
    // refresh right totalBought from contract
    const { totalBought } = yield* call(idoFarmeContract.methods.idoParams(idoIncrement).call);

    // for ido with vesting conditional check vesting params
    if (vesting) {
      const { startUnlockPercent, unlockPercent, unlockStepTime } = yield* call(
        idoFarmeContract.methods.vestingInfo(idoIncrement).call,
      );
      vestingInfo = { startUnlockPercent, unlockPercent, unlockStepTime };
    }

    // check for owner is liquidity added yet
    const isLiqAdded = yield* call(idoFarmeContract.methods.isLiqAdded(idoIncrement).call);

    // check is user registered
    const { data } = yield* call(baseApi.getUserAllocation, { address, pk: +idoId });

    const updatedUserInfo = {
      ...userInfo,
      payed,
      claimAmount,
      totalBought,
    };

    // if user registered, response will be equal 0 or more then 0
    if (data.response >= 0) {
      yield* put(
        updateIdoState({
          userInfo: { ...updatedUserInfo, userAllocation: data.response.toString() },
          vestingInfo,
          isLiqAdded,
        }),
      );
    } else {
      yield* put(
        updateIdoState({
          userInfo: { ...updatedUserInfo },
          vestingInfo,
          isLiqAdded,
        }),
      );
    }

    yield* put(success(type));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    yield* put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_INVESTMENTS_INFO, getInvestmentsInfoSaga);
}
