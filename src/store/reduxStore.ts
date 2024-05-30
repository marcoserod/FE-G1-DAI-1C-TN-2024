import {configureStore} from '@reduxjs/toolkit';

import {moviesApi} from '../services/movies';
import {authApi} from '../services/auth';
import authReducer from './authSlice';
import {usersApi} from '../services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['isLogged', 'userId', 'moviePlayToken', 'refreshToken'],
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    userSession: persistedAuthReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(moviesApi.middleware, usersApi.middleware, authApi.middleware);
  },
});

export const persistor = persistStore(store);
