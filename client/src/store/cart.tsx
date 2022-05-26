import { Product } from "./models/productModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItemsProps {
  _id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  inStock: number;
  fastDelivery: boolean;
  ratings: number;
  numReviews: number;
  qty: number;
}

interface IshippingAddress {
  fullName: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
}

interface cartState {
  shippingAddress?: IshippingAddress;
  paymentMethod: string | null;
  cartItems: CartItemsProps[];
}

export type Action = {
  type: string;
  payload?: any;
};

const initialState = {
  paymentMethod: "",
  cartItems: [],
} as cartState;

//creatteSlice

const slice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    cartAdded: (state, action: PayloadAction<Product>) => {
      state.cartItems.push({
        ...action.payload,
        qty: 1,
      });
    },
    cartRemoved: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
    },
    cartChanged: (
      state,
      action: PayloadAction<{ id: string; qty: number }>
    ) => {
      state.cartItems.filter((c) =>
        c._id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
      );
    },

    saveShippingAddress: (state, action: PayloadAction<any>) => {
      state.shippingAddress = action.payload;
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },

    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const {
  cartAdded,
  cartRemoved,
  cartChanged,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} = slice.actions;
export default slice.reducer;
