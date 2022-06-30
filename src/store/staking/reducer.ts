import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StakingState } from 'types';

const initialState: StakingState = {
  totalStakedAmount: '',
  userStakes: [],
};

export const stakingReducer = createSlice({
  name: 'staking',
  initialState,
  reducers: {
    updateStakingState: (state, action: PayloadAction<Partial<StakingState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateStakingState } = stakingReducer.actions;

export default stakingReducer.reducer;
