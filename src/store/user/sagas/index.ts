import { fork } from 'redux-saga/effects';

import approve from './approve';
import getNativeBalance from './getNativeBalance';
import getRankId from './getRankId';
import getTokenBalance from './getTokenBalance';
import getXTokenBalance from './getXTokenBalance';
import updateUserData from './updateUserData';

export default function* userSagas() {
  yield fork(approve);
  yield fork(getTokenBalance);
  yield fork(getXTokenBalance);
  yield fork(getRankId);
  yield fork(getNativeBalance);
  yield fork(updateUserData);
}
