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
import PaymentmethodReducer from "../components/ChoosePayment/ChoosePayment";
import { combineReducers } from "redux";
import timesAPI from "../service/time.service";
import bookTicketsAPI from "../service/book_ticket.service";
import cateDetailAPI from "../service/catedetail.service";
import bookingSeatAPI from "../service/chairs.service";
import authReducer from "../components/CinemaSlice/authSlice";
import usersAPI from "../service/signup_login.service";
import payAPI from "../service/payVnpay.service";

import { analyticApi } from "../service/analytic.service";
import vouchersAPI from "../service/voucher.service";
import seatkepingAPI from "../service/seatkeping.service";
import sendEmailAPI from "../service/sendEmail.service";
import payMoMoAPI from "../service/payMoMo.service";
import memberAPI from "../service/member.service";
import blogsAPI from "../service/blog.service";
import commentsAPI from "../service/commentBlog.service";
import refundAPI from "../service/refund.service";
import commentsFilmAPI from "../service/commentfilm.service";

// Import redux-persist
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: [
    "selectedCinema",
    "pays",
    "bkseats",
    "TKinformation",
    "Paymentmethod",
  ],
};

const rootReducer = combineReducers({
  films: filmsAPI.reducer,
  cates: categorysAPI.reducer,
  cinemas: cinemasAPI.reducer,
  vouchers: vouchersAPI.reducer,
  shows: showsAPI.reducer,
  times: timesAPI.reducer,
  pays: payAPI.reducer,
  bookTickets: bookTicketsAPI.reducer,
  foods: foodAPI.reducer,
  seatKeping: seatkepingAPI.reducer,
  movies: movieRoomAPI.reducer,
  paymentmomo: payMoMoAPI.reducer,
  catedetails: cateDetailAPI.reducer,
  bkseats: bookingSeatAPI.reducer,
  sendEmail: sendEmailAPI.reducer,
  selectedCinema: selectedCinemaReducer,
  TKinformation: TKinformationReducer,
  commentsfilm: commentsFilmAPI.reducer,
  Paymentmethod: PaymentmethodReducer,
  users: usersAPI.reducer,
  blogs: blogsAPI.reducer,
  comments: commentsAPI.reducer,
  refund: refundAPI.reducer,
  auth: authReducer,
  [analyticApi.reducerPath]: analyticApi.reducer,
  [memberAPI.reducerPath]: memberAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewareArray = getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["selectedCinema"],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }).concat(
      filmsAPI.middleware,
      categorysAPI.middleware,
      bookingSeatAPI.middleware,
      cinemasAPI.middleware,
      showsAPI.middleware,
      seatkepingAPI.middleware,
      timesAPI.middleware,
      sendEmailAPI.middleware,
      vouchersAPI.middleware,
      payAPI.middleware,
      payMoMoAPI.middleware,
      bookTicketsAPI.middleware,
      foodAPI.middleware,
      movieRoomAPI.middleware,
      cateDetailAPI.middleware,
      usersAPI.middleware,
      commentsFilmAPI.middleware,
      analyticApi.middleware,
      memberAPI.middleware,
      blogsAPI.middleware,
      commentsAPI.middleware,
      refundAPI.middleware
    );

    return middlewareArray;
  },
});

setupListeners(store.dispatch);
const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
