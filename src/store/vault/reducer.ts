import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VaultState } from 'types';

const initialState: VaultState = {
  userLockedAmount: '',
  userUnlockedAmount: '',
};

export const vaultReducer = createSlice({
  name: 'vault',
  initialState,
  reducers: {
    updateVaultState: (state: VaultState, action: PayloadAction<Partial<VaultState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateVaultState } = vaultReducer.actions;

export default vaultReducer.reducer;
