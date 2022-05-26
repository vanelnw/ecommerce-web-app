import { configureStore, Action } from "@reduxjs/toolkit";
import api from "./middleware/api";
import reducer from "./reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction } from "redux-thunk";

// eslint-disable-next-line import/no-anonymous-default-export
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppSelector<Return> = (state: RootState) => Return;
// create a custom `createSelector` that uses the type above
export const createAppSelector = <R,>(
  selector: AppSelector<R>
): AppSelector<R> => selector;

export default store;



