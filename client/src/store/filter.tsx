import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  sort: string;
  byCategory: string;
  byStock: boolean;
  byFastDelivery: boolean;
  byRating: number | null;
  byPrice: number | number[];
  searchQuery: string;
}

const initialState = {
  sort: "",
  byCategory: "",
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  byPrice: 100,
  searchQuery: "",
} as FilterState;

const slice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    querySearch:(state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    sortByPrice: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.byCategory = action.payload;
    },
    filterByRating: (state, action: PayloadAction<number | null>) => {
      state.byRating = action.payload;
    },
    filterByPrice: (state, action: PayloadAction<number | number[]>) => {
      state.byPrice = action.payload;
    },
    filterByStock: (state, action) => {
      state.byStock = !state.byStock;
    },
    filterByDelivery: (state, action) => {
      state.byFastDelivery = !state.byFastDelivery;
    },
    clearFilter: (state, action) => {
      state.byCategory = "";
      state.sort = "";
      state.byCategory = "";
      state.byStock = false;
      state.byFastDelivery = false;
      state.byRating = 0;
      state.byPrice = 100;
      state.searchQuery = "";
    },
  },
});

export const {
  querySearch,
  sortByPrice,
  filterByCategory,
  filterByRating,
  filterByPrice,
  filterByStock,
  filterByDelivery,
  clearFilter,
} = slice.actions;
export default slice.reducer;
