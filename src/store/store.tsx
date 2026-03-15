import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import filmsAPI from "../service/films.service";
import categorysAPI from "../service/cate.service";
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

import cinemasAPI from "../service/brand.service";
import showsAPI from "../service/show.service";
import foodAPI from "../service/food.service";
import movieRoomAPI from "../service/movieroom.service";
import selectedCinemaReducer from "../components/CinemaSlice/selectedCinemaSlice";
import TKinformationReducer from "../components/CinemaSlice/selectSeat";
import { combineReducers } from "redux";
import timesAPI from "../service/time.service";
import bookTicketsAPI from "../service/book_ticket.service";
import cateDetailAPI from "../service/catedetail.service";
import bookingSeatAPI from "../service/chairs.service";
import authReducer from "../components/CinemaSlice/authSlice";
import usersAPI from "../service/signup_login";
import payAPI from "../service/pay.service";
import CinemasAPICinemas from "../service/cinemas.service";
import { analyticApi } from "../service/analytic.service";
// Import redux-persist
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: [
    "films",
    "cates",
    "cinemas",
    "shows",
    "selectedCinema",
    "foods",
    "auth",
    "movies",
    "catedetails",
    "bkseats",
    "users",
    "pays",
    "TKinformation",
  ],
};

const rootReducer = combineReducers({
  films: filmsAPI.reducer,
  cates: categorysAPI.reducer,
  cinemas: cinemasAPI.reducer,
  shows: showsAPI.reducer,
  times: timesAPI.reducer,
  pays: payAPI.reducer,
  bookTickets: bookTicketsAPI.reducer,
  foods: foodAPI.reducer,
  movies: movieRoomAPI.reducer,
  catedetails: cateDetailAPI.reducer,
  bkseats: bookingSeatAPI.reducer,
  selectedCinema: selectedCinemaReducer,
  TKinformation: TKinformationReducer,
  users: usersAPI.reducer,
  auth: authReducer,
  cinemasMovie: CinemasAPICinemas.reducer,
  [analyticApi.reducerPath]: analyticApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["selectedCinema"],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      filmsAPI.middleware,
      categorysAPI.middleware,
      bookingSeatAPI.middleware,
      cinemasAPI.middleware,
      showsAPI.middleware,
      timesAPI.middleware,
      payAPI.middleware,
      bookTicketsAPI.middleware,
      foodAPI.middleware,
      movieRoomAPI.middleware,
      cateDetailAPI.middleware,
      usersAPI.middleware,
      analyticApi.middleware
    ),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);

// Xóa dữ liệu đã lưu trong Redux-Persist để làm mới dữ liệu
const refreshData = async () => {
  await persistor.purge();
  window.location.reload(); // Tải lại ứng dụng
};

export { store, persistor, refreshData };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
