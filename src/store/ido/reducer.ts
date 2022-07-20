import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdoState } from 'types';
import { IDO } from 'types/api/IDO';

const initialState: IdoState = {
  ido: {
    count: 0,
    idos: [],
  },
  currentIdo: {} as IDO,
  userInfo: {
    userAllocation: null,
    payed: '',
    claimAmount: [],
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
      ...initialState.currentIdo,
      ...initialState.userInfo,
    }),
  },
});

export const { updateIdoState, resetCurrentIdo } = idoReducer.actions;

export default idoReducer.reducer;