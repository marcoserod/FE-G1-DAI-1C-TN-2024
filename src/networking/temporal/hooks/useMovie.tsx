import React, {useEffect, useState} from 'react';
import * as UseCases from '../core/use-cases';
import {FullMovie} from '../core/entities/movie.entity';

import {Cast} from '../core/entities/cast.entity';
import {movieDbFetcher} from '../config/adapters/movieDb.adapter';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    const fullMovie = await UseCases.getMovieByIdUseCase(
      movieDbFetcher,
      movieId,
    );
    setMovie(fullMovie);
    setIsLoading(false);
  };

  return {
    isLoading,
    movie,
  };
};

export const useCast = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cast, setCast] = useState<Cast[]>();

  useEffect(() => {
    loadCast();
  }, [movieId]);

  const loadCast = async () => {
    const movieCast = await UseCases.getMovieCastUseCase(
      movieDbFetcher,
      movieId,
    );
    setCast(movieCast);
    setIsLoading(false);
  };

  return {
    isLoading,
    cast,
  };
};
