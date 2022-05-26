import { createAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Product } from "./models/productModel";

export const apiRequest = createAction<Product[] | unknown>("api/Request");
export const apiRequestSuccess = createAction<AxiosResponse<any, any> | unknown>(
  "api/RequestSuccess"
);
export const apiRequestFailed = createAction<number | unknown>("api/RequestFailed");