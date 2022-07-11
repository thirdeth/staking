import { IDO } from 'types/api/IDO';

export type IdoState = {
  ido: {
    count: number;
    idos: IDO[];
  };
  currentIdo: IDO;
  userInfo: {
    userAllocation: string | null;
    claimed: string;
    bought: string;
    payed: string;
    claimAmount: string;
  };
};
