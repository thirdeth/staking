import { fork } from 'redux-saga/effects';

import addLiquidity from './addLiquidity';
import claim from './claim';
import getAddLiquidityTime from './getAddLiquidityTime';
import getIdoById from './getIdoById';
import getIdoList from './getIdoList';
import getInvestmentsInfo from './getInvestmentsInfo';
import getTotalBought from './getTotalBought';
import getUserAllocation from './getUserAllocation';
import invest from './invest';
import refund from './refund';
import registrationToIdo from './registration';

export default function* idoSagas() {
  yield fork(addLiquidity);
  yield fork(claim);
  yield fork(getIdoById);
  yield fork(getIdoList);
  yield fork(getInvestmentsInfo);
  yield fork(getTotalBought);
  yield fork(getUserAllocation);
  yield fork(invest);
  yield fork(refund);
  yield fork(registrationToIdo);
  yield fork(getAddLiquidityTime);
}
