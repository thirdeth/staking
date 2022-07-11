import { fork } from 'redux-saga/effects';

import getIdoById from './getIdoById';
import getIdoList from './getIdoList';
import getInvestmentsInfo from './getInvestmentsInfo';
import getUserAllocation from './getUserAllocation';
import invest from './invest';
import registrationToIdo from './registration';

export default function* idoSagas() {
  yield fork(getIdoById);
  yield fork(getIdoList);
  yield fork(getInvestmentsInfo);
  yield fork(getUserAllocation);
  yield fork(invest);
  yield fork(registrationToIdo);
}
