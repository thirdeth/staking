import { RegistrationIdoReq } from 'types/requests';

export default {
  getIdoList: '/ido/',
  getIdoById: (id: string) => `/ido/${id}/`,
  getUserAllocation: ({ address, pk }: RegistrationIdoReq) => `/investor/allocation/?address=${address}&pk=${pk}`,
  registrationToIdo: '/register/',
  getTopInvestors: '/investor/top/',
  getProof: '/investor/proof/',
};
