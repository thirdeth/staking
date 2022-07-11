import { URL } from 'appConstants';
import { GetIdoListReq, RegistrationIdoReq } from 'types/requests';
import { snakeize } from 'utils';

import ajax from './ajax';

export const baseApi = {
  getIdoList(payload: GetIdoListReq) {
    return ajax({
      method: 'get',
      url: URL.getIdoList,
      params: {
        ...snakeize(payload),
      },
    });
  },
  getTopInvestors() {
    return ajax({
      method: 'get',
      url: URL.getTopInvestors,
    });
  },
  getIdoById(id: string) {
    return ajax({
      method: 'get',
      url: URL.getIdoById(id),
    });
  },
  getUserAllocation(data: RegistrationIdoReq) {
    return ajax({
      method: 'get',
      url: URL.getUserAllocation(data),
    });
  },
  registrationToIdo(data: RegistrationIdoReq) {
    return ajax({
      method: 'post',
      url: URL.registrationToIdo,
      data,
    });
  },
};
