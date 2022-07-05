import { URL } from 'appConstants';
import { GetIdoListReq } from 'types/requests';
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
};
