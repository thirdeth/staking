import { fork } from 'redux-saga/effects';

import getPoolsInfo from './getPoolsInfo';
import getTopInvestors from './getTopInvestors';
import getTvlAndApr from './getTvlAndApr';
import getUserStakes from './getUserStakes';
import harvest from './harvest';
import harvestAll from './harvestAll';
import stake from './stake';
import withdraw from './withdraw';

export default function* stakingSagas() {
  yield fork(getUserStakes);
  yield fork(getPoolsInfo);
  yield fork(harvest);
  yield fork(harvestAll);
  yield fork(stake);
  yield fork(withdraw);
  yield fork(getTopInvestors);
  yield fork(getTvlAndApr);
}
