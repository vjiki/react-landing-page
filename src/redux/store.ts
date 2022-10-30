import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { postsReducer } from './slices/posts';

export function makeStore() {
  return configureStore({
    reducer: {
      posts: postsReducer,
      auth: authReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
