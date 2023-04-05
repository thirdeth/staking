import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StakingState } from 'types';

const initialState: StakingState = {
  totalStakedAmount: '',
  userStakes: [],
  topInvestors: [],
  poolsInfo: [],
  tvl: '0',
  apr: '0',
  numberOfStakers: '0',
};

export const stakingReducer = createSlice({
  name: 'staking',
  initialState,
  reducers: {
    updateStakingState: (state: StakingState, action: PayloadAction<Partial<StakingState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateStakingState } = stakingReducer.actions;

export default stakingReducer.reducer;
