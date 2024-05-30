import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logOut, setCredentials} from '../store/authSlice';

import {API_BASE_URL} from '@env';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = getState().userSession.moviePlayToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = api.getState().userSession.refreshToken;
    const refreshResult = await baseQuery(
      {
        url: '/auth/refreshToken',
        method: 'POST',
        params: {refreshToken},
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      const currentState = api.getState().userSession;
      api.dispatch(
        setCredentials({
          ...currentState,
          moviePlayToken: refreshResult.data.moviePlayToken,
          refreshToken: refreshResult.data.refreshToken,
        }),
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export default baseQueryWithReAuth;
