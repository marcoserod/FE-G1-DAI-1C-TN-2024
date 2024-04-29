import {useEffect, useState} from 'react';

import * as UseCases from '../core/use-cases/index';
import {movieDbFetcher} from '../config/adapters/movieDb.adapter';
import {Movie} from '../core/entities/movie.entity';

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

  useEffect(() => {
    initLoad();
  }, []);

  const initLoad = async () => {
    const nowPlayingMovies = await UseCases.moviesNowPloyingUseCase(
      movieDbFetcher,
    );
    setNowPlaying(nowPlayingMovies);
    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
  };
};
