import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './reAuthBaseQuery';
import {User} from './entities/user.entity';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    getUserById: builder.query<User, any>({
      query: ({userId}) => ({
        url: `/users/${userId}`,
      }),
    }),
  }),
});

export const {useGetUserByIdQuery} = usersApi;
