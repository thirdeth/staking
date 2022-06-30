import { fork } from 'redux-saga/effects';

import getUserStakes from './getUserStakes';
import harvest from './harvest';
import stake from './stake';
import withdraw from './withdraw';

export default function* stakingSagas() {
  yield fork(getUserStakes);
  yield fork(harvest);
  yield fork(stake);
  yield fork(withdraw);
}
