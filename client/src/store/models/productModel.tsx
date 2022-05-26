export enum ActionKind {
  Add = "ADD_TO_CART",
  Remove = "REMOVE_FROM_CART",
  Change = "CHANGE_CART_QTY",

  SORT_BY_PRICE = "SORT_BY_PRICE",
  FILTER_BY_STOCK = "FILTER_BY_STOCK",
  FILTER_BY_DELIVERY = "FILTER_BY_DELIVERY",
  FILTER_BY_RATING = "FILTER_BY_RATING",
  FILTER_BY_SEARCH = "FILTER_BY_SEARCH",
  FILTER_BY_PRICE = "FILTER_BY_PRICE",
  CLEAR_FILTERS = "CLEAR_FILTERS",

  USER_SIGNIN = "USER_SIGNIN",
  USER_SIGNOUT = "USER_SIGNOUT",
}

export type Action = {
  type: ActionKind,
  payload?: any
}

export interface Product {
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
}

export interface FilterState {
    sort:string,
    byStock: boolean,
    byFastDelivery: boolean,
  byRating: number,
  byPrice:number,
    searchQuery: string,
}