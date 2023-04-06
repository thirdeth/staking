import { fork } from 'redux-saga/effects';

import claim from './claim';
import deposit from './deposit';
import getUserLockedAmount from './getUserLockedAmount';
import getUserUnlockedAmount from './getUserUnlockedAmount';

export default function* stakingSagas() {
  yield fork(deposit);
  yield fork(claim);
  yield fork(getUserLockedAmount);
  yield fork(getUserUnlockedAmount);
}
