import { fork } from 'redux-saga/effects';

import getIdoList from './getIdoList';

export default function* idoSagas() {
  yield fork(getIdoList);
}
