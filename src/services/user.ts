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
    editUser: builder.mutation({
      query: ({userId, payload}) => {
        const formData = new FormData();
        if (payload.profileImage) {
          formData.append('profileImage', payload.profileImage);
          console.log(formData.getParts());
        }
        if (payload.userData) {
          const {name, surname, nickname} = payload.userData;
          formData.append('name', name);
          formData.append('surname', surname);
          formData.append('nickname', nickname);
        }
        return {
          url: `/users/${userId}`,
          method: 'PATCH',
          body: formData,
        };
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

export const {useGetUserByIdQuery, useEditUserMutation, useDeleteUserMutation} =
  usersApi;
