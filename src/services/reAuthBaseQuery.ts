import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logOut, setCredentials} from '../store/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = getState().userSession.moviePlayToken;
    if (token) {
      headers.set('Authorization', token);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  console.log('Making request to:', args);
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('entered  auth');
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
      console.log('entered  retry');
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('Token refresh failed, logging out');
      api.dispatch(logOut());
    }
  }
  return result;
};

export default baseQueryWithReAuth;
