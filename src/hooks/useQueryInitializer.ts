import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {moviesApi} from '../services/movies';

export const useQueryInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(moviesApi.endpoints.genres.initiate());

    // Add more dispatches as needed
  }, [dispatch]);
};
