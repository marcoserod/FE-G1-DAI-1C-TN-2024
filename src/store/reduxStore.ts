import {configureStore} from '@reduxjs/toolkit';

import {moviesApi} from '../services/movies';
import {authApi} from '../services/auth';
import authReducer from './authSlice';
import {usersApi} from '../services/user';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    userSession: authReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(
      moviesApi.middleware,
      usersApi.middleware,
      authApi.middleware,
    );
  },
});
