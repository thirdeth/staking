import { fork } from 'redux-saga/effects';
import stakingSaga from 'store/staking/sagas';
import userSaga from 'store/user/sagas';
/* PLOP_INJECT_IMPORT_SAGA */

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(stakingSaga);
  /* PLOP_INJECT_FORK_SAGA */
}
