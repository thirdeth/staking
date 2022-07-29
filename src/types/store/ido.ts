import { IDO } from 'types/api/IDO';

export type VestingInfoProps = {
  startUnlockPercent: string;
  unlockPercent: string;
  unlockStepTime: string;
};

export type IdoState = {
  ido: {
    count: number;
    idos: IDO[];
  };
  currentIdo: IDO;
  userInfo: {
    userAllocation: string | null;
    payed: string;
    claimAmount: string[];
    totalBought: string;
  };
  vestingInfo: VestingInfoProps;
  isLiqAdded: boolean;
};
