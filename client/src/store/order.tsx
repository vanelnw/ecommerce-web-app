import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appAxios } from "../config";
import { apiRequest } from "./api";

import { clearCart } from "./cart";
import { AppThunk } from "./configueStore";
import { IOrder } from "./models/order";

interface State {
  order: any;
  loading: boolean;
  loadingPay: boolean;
  success: boolean;
  successPay: boolean;
  error: string;
}

const initialState = {
  order: {},
  loading: false,
  loadingPay: false,
  success: false,
  successPay: false,
  error: "",
} as State;

const slice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    setLoadingPay: (state, action) => {
      state.loadingPay = action.payload;
    },
    setSuccessPay: (state, action) => {
      state.successPay = action.payload;
    },

    orderRequested: (state, action) => {
      state.loading = true;
    },
    orderAdded: (state, action: PayloadAction<any>) => {
      state.order = action.payload;
      state.success = true;
      state.loading = false;
    },
    orderRequestedSuccess: (state, action) => {
      state.success = action.payload;
    },
    orderRequestedFailed: (state, action) => {
      state.loading = false;
    },

    orderpaied: (state, action: PayloadAction<any>) => {
      state.order = action.payload;

      state.loadingPay = false;
    },

    userOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.order = action.payload;
      state.loading = false;
    },
    orderDetails: (state, action) => {
      state.order = action.payload;
      state.loading = false;
    },

    orderReset: (state, action) => {
      state.order = {};
      state.error = "";
      state.loading = false;
      state.success = false;
    },

    orderPayReset: (state, action) => {
      state.loadingPay = false;
      state.successPay = false;
    },
  },
});

export const {
  setLoadingPay,
  setSuccessPay,
  orderRequested,
  orderAdded,
  orderRequestedSuccess,
  orderRequestedFailed,
  userOrders,
  orderDetails,
  orderpaied,
  orderReset,
  orderPayReset,
} = slice.actions;

export default slice.reducer;

export const createOrder =
  (order: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(orderRequested(true));

      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await appAxios.post(
        `/api/orders`,
        order,
        config
      );

      dispatch(orderAdded(data));
      dispatch(clearCart(""));
    } catch (error) {
      dispatch(orderRequestedFailed((error as Error).message));
    }
  };

export const AddOrder = (order: any) => (dispatch: any, getState: any) => {
  const { token } = getState().auth.userInfo;

  apiRequest({
    url: `/api/orders/`,
    method: "post",
    data: order,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onStart: orderRequested.type,
    onSuccess: orderAdded.type,
    onError: orderRequestedFailed.type,
  });
};

export const payOrder =
  (orderId: any, paymentResult: any) =>
  (order: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoadingPay(true));

      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await appAxios.put(
        `/api/orders/pay/${orderId}`,
        paymentResult,
        config
      );

      dispatch(orderpaied(data));
      setSuccessPay(true);
      setLoadingPay(true);
    } catch (error) {
      dispatch(orderRequestedFailed((error as Error).message));
      setLoadingPay(false);
    }
  };

export const getOrderDetails =
  (id: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(orderRequested(true));

      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await appAxios.post(
        `/api/orders${id}`,
        config
      );

      dispatch(orderDetails(data));
    } catch (error) {
      dispatch(orderRequestedFailed((error as Error).message));
    }
  };

export const getUserOrders = () => (dispatch: any, getState: any) => {
  const { token } = getState().auth.userInfo;

  apiRequest({
    urL: `/api/orders/`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },

    onStart: orderRequested.type,
    onSuccess: userOrders.type,
    onError: orderRequestedFailed.type,
  });
};
