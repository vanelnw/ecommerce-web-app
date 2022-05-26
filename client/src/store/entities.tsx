import { combineReducers } from "redux";
import  cartReducer  from "./cart";
import productsReducer from './products'
import filterReducer from './filter'
import orderReducer from './order'

export default combineReducers({
    cart: cartReducer,
    order: orderReducer,
    products: productsReducer,
    filters:filterReducer,
})