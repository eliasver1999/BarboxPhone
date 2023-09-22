import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import userReducer from "./reducers/user";
import classTimesReducer from "./reducers/classTimes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BooksReducer from "./reducers/books";
import BodyReducer from "./reducers/body";
import WodReducer from "./reducers/wod";
import HoursReducer from "./reducers/hours";
const persistConfig = {
  key: "root2",
  storage: AsyncStorage,
};
const combReduces = combineReducers({
  user: userReducer,
  classTimes: classTimesReducer,
  books: BooksReducer,
  body: BodyReducer,
  wod: WodReducer,
  hours: HoursReducer,
});

const persistedReducer = persistReducer(persistConfig, combReduces);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
