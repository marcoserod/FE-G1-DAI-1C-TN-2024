import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moviesApi} from '../services/movies';
import {usersApi} from '../services/user';

export const useQueryInitializer = () => {
  const userId = useSelector(state => state?.userSession?.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(usersApi.endpoints.getUserById.initiate({userId}));
      dispatch(usersApi.endpoints.getFavorites.initiate({userId, page: 1}));
    }
    dispatch(moviesApi.endpoints.genres.initiate());

    // Add more dispatches as needed
  }, [dispatch, userId]);
};
