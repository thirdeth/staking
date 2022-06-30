import { IdoPublic, IdoStatus } from 'types/store/requests';

export default {
  getIdoList: (publicVar: IdoPublic, statusVar: IdoStatus) => `/get_ido_list/${publicVar}/${statusVar}/`,
};
