import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Features/ApiSlice/ApiSlice";
import LanguageReducer from "./Features/Language/Language";
export const store = configureStore({
  reducer: {
    Language: LanguageReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
