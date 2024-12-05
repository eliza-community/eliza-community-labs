import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WalletState {
  has$eliza: number;
}

const initialState: WalletState = {
  has$eliza: 0,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletState: (state, action) => {
      state.has$eliza = action.payload.has$eliza;
    }
  }
})

export const walletReducer = walletSlice.reducer;

export const { updateWalletState } = walletSlice.actions;

export const getWalletState = (state: RootState) => state.wallet;