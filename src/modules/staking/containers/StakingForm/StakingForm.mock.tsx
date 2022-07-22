import { StakingFormProps } from './StakingForm';

export const stakingFormPropsMocked: StakingFormProps = {
  stakePeriod: 1,
  stakeValue: '123',
  tokenBalance: '12',
  totalStakedAmount: '11',
  isStaking: false,
  onStake: () => {},
  onChangeStakePeriod: () => {},
  onChangeStakeValue: () => {},
  onSetMaxStakeValue: () => {},
  poolsAprArr: [7, 25, 70],
  poolsInfo: [
    {
      apr: '',
      commission: '',
      timeLockUp: '',
    },
  ],
};
