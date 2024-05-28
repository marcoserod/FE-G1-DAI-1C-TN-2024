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
        body: {
          authToken: idToken,
        },
      }),
    }),
    logout: builder.mutation({
      query: refreshToken => ({
        url: 'auth',
        method: 'DELETE',
        body: {
          refreshToken,
        },
      }),
    }),
  }),
});

export const {useLoginMutation, useLogoutMutation} = authApi;
