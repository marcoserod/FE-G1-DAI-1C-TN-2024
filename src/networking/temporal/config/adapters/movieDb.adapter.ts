import {AxiosAdapter} from './http/axios.adapter';

export const movieDbFetcher = new AxiosAdapter({
  baseUrl: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '',
    language: 'es',
  },
});
