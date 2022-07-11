import { RegistrationIdoReq } from 'types/requests';

export default {
  getIdoList: '/get_ido_list/',
  getIdoById: (id: string) => `/ido/${id}/`,
  getUserAllocation: ({ address, pk }: RegistrationIdoReq) => `/investor_allocation/?address=${address}&pk=${pk}`,
  registrationToIdo: '/registration_to_ido/',
  getTopInvestors: '/get_top_investors/',
};
