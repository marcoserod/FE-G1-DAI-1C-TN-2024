import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './reAuthBaseQuery';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    login: builder.mutation({
      query: idToken => ({
        url: '/auth',
        method: 'POST',
        params: {
          authenticationRequest: idToken,
        },
      }),
    }),
    logout: builder.mutation({
      query: refreshToken => ({
        url: 'auth',
        method: 'DELETE',
        params: {
          refreshToken,
        },
      }),
    }),
  }),
});

export const {useLoginMutation, useLogoutMutation} = authApi;
