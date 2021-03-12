import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    signIn: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
