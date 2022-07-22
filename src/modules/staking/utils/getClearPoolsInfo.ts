import { PoolsInfoProps } from 'types';

type PoolsInfoArrDirtyProps = Array<{ [k: string]: string }>;

export const getClearPoolsInfo = (poolsInfoArrDirty: PoolsInfoArrDirtyProps): PoolsInfoProps[] => {
  return poolsInfoArrDirty.map(({ apr, commission, timeLockUp }) => ({
    apr,
    commission,
    timeLockUp,
  }));
};
