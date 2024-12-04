import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./store/chatSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { walletReducer } from "./store/wallet";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    wallet: walletReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector