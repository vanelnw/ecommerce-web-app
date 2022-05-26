import { Product } from "./models/productModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import {AppThunk, RootState } from "./configueStore";
import { appAxios } from "../config";

interface productState {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string;
  lastFetch: any;
}

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: "",
  lastFetch: null,
} as productState;

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRequested: (state, action) => {
      state.loading = true;
    },
    productsReceived: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    productsRequestedFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    productAdded: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    productCtegories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    //Product reviews
    reviewAdded: (state, action) => {
      const index = state.products.findIndex(
        (x) => x._id === action.payload.id
      );
      state.products[index] = action.payload;
    },
  },
});

export const {
  productAdded,
  productsReceived,
  productsRequested,
  productsRequestedFailed,
  productCtegories,
  reviewAdded,
} = slice.actions;

export default slice.reducer;

//ActionsCreator
const url = "/products";

export const loadProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(productsRequested(true));

    const { data } = await appAxios.get(`/api/products`);

    dispatch(productsReceived(data));
  } catch (error) {
    dispatch(productsRequestedFailed((error as Error).message));
  }
};

export const loadProductsCategories = (): AppThunk => async (dispatch) => {
  try {
    dispatch(productsRequested(true));

    const { data } = await appAxios.get(
      `/api/products/category`
    );

    dispatch(productCtegories(data));
  } catch (error) {
    dispatch(productsRequestedFailed((error as Error).message));
  }
};

export const addProductsReview =
  (review: any): AppThunk =>
    async (dispatch, getState) => {
      try {
        dispatch(productsRequested(true));

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
          `/api/products/review`,
          review,
          config
        );

        dispatch(reviewAdded(data));
      } catch (error) {
        dispatch(productsRequestedFailed((error as Error).message));
      }
    };

type Return0 = (state: RootState) => Product[];
export const getProductsByCategory = (category: string): Return0 =>
  createSelector(
    (state: RootState) => state.entities.products,
    (products): Product[] =>
      products.products.filter(
        (product: Product) => product.category === category
      )
  );

type Return = (state: RootState) => Product | undefined;
export const getProductsById = (id: string): Return =>
  createSelector(
    (state: RootState) => state.entities.products,
    (products) =>
      products.products.find((product: Product) => product._id === id)
  );

type Return1 = (state: RootState) => Product[] | undefined;
export const getFilteredProducts = createSelector(
  (state: RootState) => state.entities.products.products,
  (state: RootState) => state.entities.filters,
  (products, filters): Product[] => {
    const {
      sort,
      byCategory,
      byStock,
      byFastDelivery,
      byPrice,
      byRating,
      searchQuery,
    } = filters;
    let sortedProducts: Product[] = products;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (byCategory) {
      sortedProducts = sortedProducts.filter(
        (prod: Product) => prod.category === byCategory
      );
    }

    if (sort) {
      sortedProducts = sortedProducts
        .slice()
        .sort((a: any, b: any) =>
          sort === "lowToHigh" ? +a.price - +b.price : +b.price - +a.price
        );
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod: Product) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter(
        (prod: Product) => prod.fastDelivery
      );
    }

    if (byPrice) {
      sortedProducts = sortedProducts.filter(
        (prod: Product) => parseInt(prod.price) >= byPrice
      );
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod: Product) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod: Product) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  }
);
