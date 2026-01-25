import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import filmsAPI from "../service/films.service";
import categorysAPI from "../service/cate.service";
import cinemasAPI from "../service/brand.service";
import showsAPI from "../service/show.service";

export const store = configureStore({
  reducer: {
    films: filmsAPI.reducer,
    cates: categorysAPI.reducer,
    cinemas: cinemasAPI.reducer,
    shows: showsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      filmsAPI.middleware,
      categorysAPI.middleware,
      cinemasAPI.middleware,
      showsAPI.middleware
    ),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
