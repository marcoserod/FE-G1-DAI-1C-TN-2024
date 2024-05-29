import {createApi} from '@reduxjs/toolkit/query/react';
import {MovieMapper} from './infrastructure/mappers/movie.mapper';
import {Movie} from './entities/movie.entity';
import baseQueryWithReAuth from './reAuthBaseQuery';

export const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    nowPlaying: builder.query({
      query: ({page}) => ({
        url: '/movies/nowPlaying',
        params: {page},
      }),
      transformResponse: response => ({
        movies: response.movies?.map(MovieMapper.fromMoviePlayResultToEntity),
        totalRecords: response.metadata?.totalRecords,
        totalPages: response.metadata?.totalPages,
        currentPage: response.metadata?.currentPage,
      }),
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.movies.push(...newItems.movies);
      },
      // Refetch when the page arg changes
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    getMovieById: builder.query<Movie, any>({
      query: ({movieId}) => ({
        url: `/movies/${movieId}`,
      }),
      /*   transformResponse: response => {
        return response.movies?.map(MovieMapper.fromMoviePlayResultToEntity);
      }, */
    }),
    genres: builder.query<any, any>({
      query: () => ({
        url: '/movies/genres',
      }),
    }),
    search: builder.query({
      query: ({searchValue, page, dateSort, rateSort, filters}) => ({
        url: 'movies/search',
        params: {
          name: searchValue,
          sortCriteria: `date:${dateSort},rate:${rateSort}`,
          filters: filters.join(','),
          page,
        },
      }),
      transformResponse: response => ({
        movies: response.movies?.map(MovieMapper.fromMoviePlayResultToEntity),
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
  }),
});

export const {
  useNowPlayingQuery,
  useGenresQuery,
  useLazySearchQuery,
  useGetMovieByIdQuery,
} = moviesApi;
