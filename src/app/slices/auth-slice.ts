import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import authService from "../../services/api/auth-service";
import storageService from "../../services/storage/storage-service";
import { ILoginParams } from "../../interfaces/auth-interfaces";

interface SignInResponse {
  login: string;
  password: string;
}

export interface SignInState {
  response:SignInResponse | null;
  signInLoading: boolean;
  signInError: string | boolean;
  isAuthenticated: boolean;
};

export const initialState: SignInState = {
  response: null,
  signInLoading: false,
  signInError: true,
  isAuthenticated: false,
};

export const signInSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInRequest: (state) => {
      state.signInLoading = true;
    },
    signInSuccess: (state, action: PayloadAction<SignInResponse>) => {
      state.response = action.payload;
      state.signInLoading = false;
      state.isAuthenticated = true;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.response = null;
      state.signInLoading = false;
      state.signInError = action.payload;
      state.isAuthenticated = false;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
} = signInSlice.actions;

export const signIn = (params: ILoginParams): AppThunk => async (
  dispatch
) => {
  dispatch(signInRequest());
  try {
    const res = await authService.login(params);
    dispatch(signInSuccess(res.data));
    storageService.setItem("token", res.data.token);
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};

export const selectSignInState = (state: RootState) => state.signIn;

export default signInSlice.reducer;
