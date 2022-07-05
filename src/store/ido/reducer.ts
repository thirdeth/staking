import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdoState } from 'types';

const initialState: IdoState = {
  ido: {
    count: 0,
    idos: [],
  },
};

export const idoReducer = createSlice({
  name: 'ido',
  initialState,
  reducers: {
    updateIdoState: (state: IdoState, action: PayloadAction<Partial<IdoState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateIdoState } = idoReducer.actions;

export default idoReducer.reducer;
