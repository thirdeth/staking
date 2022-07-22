import { fork } from 'redux-saga/effects';

import getPoolsInfo from './getPoolsInfo';
import getTopInvestors from './getTopInvestors';
import getUserStakes from './getUserStakes';
import harvest from './harvest';
import stake from './stake';
import withdraw from './withdraw';

export default function* stakingSagas() {
  yield fork(getUserStakes);
  yield fork(getPoolsInfo);
  yield fork(harvest);
  yield fork(stake);
  yield fork(withdraw);
  yield fork(getTopInvestors);
}
