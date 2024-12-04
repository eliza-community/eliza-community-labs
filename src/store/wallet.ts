import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WalletState {
  isConnected: boolean;
  address: string;
  $elizaBalance: number;
}

const initialState: WalletState = {
  isConnected: false,
  address: '',
  $elizaBalance: 0,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletState: (state, action) => {
      state.isConnected = action.payload.isConnected;
      state.address = action.payload.address;
      state.$elizaBalance = action.payload.$elizaBalance;
    }
  }
})

export const walletReducer = walletSlice.reducer;

export const { updateWalletState } = walletSlice.actions;

export const getWalletState = (state: RootState) => state.wallet;