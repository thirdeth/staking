import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { call, CallEffect, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import userSelector from 'store/user/selectors';
import { validateStatus } from 'utils/validateStatus';

const client: AxiosInstance = axios.create({
  baseURL: 'https://dapp.arbisphere.finance/api/v1/', // 'https://devcronos.rocknblock.io/api/v1/', //
  validateStatus,
});

export default function* ajax(config: AxiosRequestConfig): Generator<SelectEffect | CallEffect | PutEffect> {
  const accessToken = yield select(userSelector.getProp('key'));

  if (accessToken) {
    client.defaults.headers.common.Authorization = `Token ${accessToken}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = yield call<(configVar: AxiosRequestConfig) => Promise<AxiosResponse>>(client, config);

  if (accessToken && response.status === 401) {
    // do disconnect logic
    // yield put(disconnectWalletState());
  }

  return response;
}
