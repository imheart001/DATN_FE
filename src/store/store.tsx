import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import filmsAPI from "../service/films.service";
import categorysAPI from "../service/cate.service";
import cinemasAPI from "../service/brand.service";
import showsAPI from "../service/show.service";
import selectedCinemaReducer from "../components/CinemaSlice/selectedCinemaSlice";
import { combineReducers } from "redux";
import timesAPI from "../service/time.service";

// Import redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["films", "cates", "cinemas", "shows","times", "selectedCinema"],
};

const rootReducer = combineReducers({
  films: filmsAPI.reducer,
  cates: categorysAPI.reducer,
  cinemas: cinemasAPI.reducer,
  shows: showsAPI.reducer,
  times: timesAPI.reducer,
  selectedCinema: selectedCinemaReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["selectedCinema"], // Thêm path của action chứa giá trị không serializable vào đây
      },
    }).concat(
      filmsAPI.middleware,
      categorysAPI.middleware,
      cinemasAPI.middleware,
      showsAPI.middleware,
      timesAPI.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
