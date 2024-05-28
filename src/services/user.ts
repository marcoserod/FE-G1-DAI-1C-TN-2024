import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './reAuthBaseQuery';
import {User} from './entities/user.entity';
import axios from 'axios';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    getUserById: builder.query<User, any>({
      query: ({userId}) => ({
        url: `/users/${userId}`,
      }),
    }),
    editUser: builder.mutation({
      queryFn: async (
        {userId, userData},
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
        const state = _queryApi.getState();
        const token = state.userSession.moviePlayToken;
        const formData = new FormData();
        const userDataBlob = new Blob([JSON.stringify(userData)], {
          type: 'application/json',
        });
        formData.append('userData', userDataBlob);

        try {
          const response = await axios({
            method: 'PATCH',
            url: `https://be-g1-dai-1c-tn-2024.onrender.com/users/${userId}`,
            data: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });

          return {data: response.data};
        } catch (error) {
          return {
            error: {
              status: error.response?.status,
              data: error.response?.data || error.message,
            },
          };
        }
      },
    }),
    deleteUser: builder.mutation({
      query: ({userId}) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {useGetUserByIdQuery, useEditUserMutation} = usersApi;
