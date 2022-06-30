import { URL } from 'appConstants';
import { IdoPublic, IdoStatus } from 'types/store/requests';

import ajax from './ajax';

export const baseApi = {
  getIdoList(publicVar: IdoPublic, statusVar: IdoStatus) {
    return ajax({
      method: 'get',
      url: URL.getIdoList(publicVar, statusVar),
    });
  },
};
