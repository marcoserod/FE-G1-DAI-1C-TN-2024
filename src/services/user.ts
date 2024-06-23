import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './reAuthBaseQuery';
import {User} from './entities/user.entity';
import {MovieMapper} from './infrastructure/mappers/movie.mapper';

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
    getFavorites: builder.query({
      query: ({userId, page}) => ({
        url: `/users/${userId}/favorites`,
        params: {
          page,
        },
      }),
      transformResponse: response => ({
        movies: response.movies?.map(MovieMapper.fromMoviePlayResultToFavorite),
        totalRecords: response.metadata?.totalRecords,
        totalPages: response.metadata?.totalPages,
        currentPage: response.metadata?.currentPage,
      }),
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems, {arg}) => {
        if (arg.page === 1) {
          return newItems;
        } else {
          currentCache.movies.push(...newItems.movies);
        }
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    addFavorite: builder.mutation({
      query: ({userId, movieId}) => ({
        url: `/users/${userId}/favorites/${movieId}`,
        method: 'POST',
      }),
    }),
    removeFavorite: builder.mutation({
      query: ({userId, movieId}) => ({
        url: `/users/${userId}/favorites/${movieId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
  useLazyGetFavoritesQuery,
} = usersApi;
