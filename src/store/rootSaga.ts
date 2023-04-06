import { fork } from 'redux-saga/effects';
/* PLOP_INJECT_IMPORT_SAGA */
import idoSaga from 'store/ido/sagas';
import stakingSaga from 'store/staking/sagas';
import userSaga from 'store/user/sagas';
import vaultSaga from 'store/vault/sagas';

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(stakingSaga);
  yield fork(vaultSaga);
  /* PLOP_INJECT_FORK_SAGA */
  yield fork(idoSaga);
}
