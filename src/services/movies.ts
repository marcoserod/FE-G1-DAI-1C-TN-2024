import {createApi} from '@reduxjs/toolkit/query/react';
import {MovieMapper} from './infrastructure/mappers/movie.mapper';
import {Movie} from './entities/movie.entity';
import baseQueryWithReAuth from './reAuthBaseQuery';

export const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    nowPlaying: builder.query<Movie[], any>({
      query: () => ({
        url: '/movies/nowPlaying',
        params: {page: 1},
      }),
      transformResponse: response => {
        return response.movies?.map(MovieMapper.fromMoviePlayResultToEntity);
      },
    }),
    genres: builder.query<any, any>({
      query: () => ({
        url: '/movies/genres',
      }),
    }),
    search: builder.query<Movie[], any>({
      query: ({searchValue}) => ({
        url: 'movies/search',
        params: {
          name: searchValue,
          sortCriteria: 'date:desc,rate:desc',
          page: 1,
        },
      }),
      transformResponse: response => {
        return response.movies?.map(MovieMapper.fromMoviePlayResultToEntity);
      },
    }),
  }),
});

export const {useNowPlayingQuery, useGenresQuery, useLazySearchQuery} =
  moviesApi;
