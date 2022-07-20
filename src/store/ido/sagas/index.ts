import { fork } from 'redux-saga/effects';

import addLiquidity from './addLiquidity';
import claim from './claim';
import getIdoById from './getIdoById';
import getIdoList from './getIdoList';
import getInvestmentsInfo from './getInvestmentsInfo';
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
  yield fork(getUserAllocation);
  yield fork(invest);
  yield fork(refund);
  yield fork(registrationToIdo);
}
