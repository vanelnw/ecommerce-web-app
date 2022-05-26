import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appAxios } from "../config";
import { apiRequest } from "./api";
import { AppThunk } from "./configueStore";

interface State {
  userInfo?: any;
  loading: boolean;
  error: string;
}

const initialState = {
  loading: false,
  error: "",
} as State;

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    logInUser: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
      state.loading = false;
    },

    userRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    registerUser: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
      state.loading = false;
    },

    logOut: (state, action) => {
      localStorage.removeItem("userInfo");
      state.userInfo = undefined;
    },
  },
});

export const {
  logInUser,
  registerUser,
  logOut,
  setLoading,
  userRequestFailed,
} = slice.actions;
export default slice.reducer;

//Action Creator

const url = "/products";

export const login =
  (user: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const { data } = await appAxios.post(
        `/api/auth/login`,
        user
      );

      dispatch(logInUser(data));
    } catch (error) {
      dispatch(userRequestFailed((error as Error).message));
    }
  };

export const register =
  (user: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const { data } = await appAxios.post(`/api/auth`, user);

      dispatch(registerUser(data));
    } catch (error) {
      dispatch(userRequestFailed((error as Error).message));
    }
  };

export const Register = (user: State) =>
  apiRequest({
    url,
    method: "post",
    data: user,
    onStart: setLoading.type,
    onSuccess: registerUser.type,
    onError: userRequestFailed.type,
  });
