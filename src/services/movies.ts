import {createApi} from '@reduxjs/toolkit/query/react';
import {MovieMapper} from './infrastructure/mappers/movie.mapper';
import {FullMovie} from './entities/movie.entity';
import baseQueryWithReAuth from './reAuthBaseQuery';
import {FullMovieResult} from './infrastructure/interfaces/moviePlay.responses';

export const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    nowPlaying: builder.query({
      query: ({page, region}) => ({
        url: '/movies/nowPlaying',
        params: {page, region},
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
    getMovieById: builder.query<FullMovie, any>({
      query: ({movieId}) => ({
        url: `/movies/${movieId}`,
      }),
      transformResponse: (response: FullMovieResult) => {
        return MovieMapper.fromMoviePlayToEntity(response);
      },
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
    rate: builder.mutation({
      query: ({movieId, rating}) => ({
        url: `/movies/${movieId}/ratings`,
        method: 'POST',
        body: {
          rating,
        },
      }),
    }),
  }),
});

export const {
  useNowPlayingQuery,
  useGenresQuery,
  useLazySearchQuery,
  useGetMovieByIdQuery,
  useRateMutation,
} = moviesApi;
