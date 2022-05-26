import axios, { AxiosRequestHeaders, Method } from "axios";
import *  as actions from '../api';
import { AppDispatch, AppState, AppThunk } from "../configueStore";
import { Dispatch } from "redux";


import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/productModel";
import { appAxios } from "../../config";

interface Action {
  url: string;
  method:Method;
  data?: any;
  headers?: AxiosRequestHeaders;
  onSuccess?: string;
  onError?: string;
  onStart?: string;
}

const api =
  (dispatch:any) =>(next: (action: PayloadAction<Action>) => void) =>
  async (action: PayloadAction<Action>) => {
    if (action.type !== actions.apiRequest.type) return next(action);

    const { url, method, data, headers, onSuccess, onError, onStart } =
      action.payload;
    debugger;
    if (onStart) dispatch({ type: onError });

    next(action);

    try {
      const response = await appAxios.request({
        baseURL: "/api",
        url,
        method,
        data,
        headers,
      });
      //General
      dispatch(actions.apiRequestSuccess(response.data));
      //spacifique
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General
      dispatch(actions.apiRequestFailed((error as Error).message));
      //specifique
      if (onError)
        dispatch({ type: onError, payload: (error as Error).message });
    }
  };

export default api;