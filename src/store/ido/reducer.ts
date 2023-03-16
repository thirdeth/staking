import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdoState } from 'types';
import { Ido } from 'types/api/Ido';

const initialState: IdoState = {
  ido: {
    count: 0,
    idos: [],
  },
  currentIdo: {} as Ido,
  userInfo: {
    userAllocation: null,
    payed: '',
    bought: '',
    claimAmount: [],
    totalBought: '',
    contractHardCap: '',
  },
  vestingInfo: {
    startUnlockPercent: '',
    unlockPercent: '',
    unlockStepTime: '',
  },
  isLiqAdded: false,
};

export const idoReducer = createSlice({
  name: 'ido',
  initialState,
  reducers: {
    updateIdoState: (state: IdoState, action: PayloadAction<Partial<IdoState>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentIdo: (state: IdoState) => ({
      ...state,
      ...initialState,
    }),
  },
});

export const { updateIdoState, resetCurrentIdo } = idoReducer.actions;

export default idoReducer.reducer;
