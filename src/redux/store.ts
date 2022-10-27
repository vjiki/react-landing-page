import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { postsReducer } from './slices/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
