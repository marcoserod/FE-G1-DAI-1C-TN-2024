import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  userId: null,
  moviePlayToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isLogged = true;
      state.userId = action.payload.userId;
      state.moviePlayToken = action.payload.moviePlayToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logOut: state => {
      state.isLogged = false;
      state.userId = null;
      state.moviePlayToken = null;
      state.refreshToken = null;
    },
  },
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;
