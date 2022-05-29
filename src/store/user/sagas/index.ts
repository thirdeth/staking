import { fork } from 'redux-saga/effects';

import approve from './approve';

export default function* userSagas() {
  yield fork(approve);
}
