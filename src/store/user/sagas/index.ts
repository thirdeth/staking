import { fork } from 'redux-saga/effects';

import approve from './approve';
import getNativeBalance from './getNativeBalance';
import getTokenBalance from './getTokenBalance';

export default function* userSagas() {
  yield fork(approve);
  yield fork(getTokenBalance);
  yield fork(getNativeBalance);
}
