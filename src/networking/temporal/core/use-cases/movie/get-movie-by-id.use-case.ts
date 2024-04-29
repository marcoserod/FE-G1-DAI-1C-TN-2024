import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {FullMovie} from '../../entities/movie.entity';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    console.log(movieId);
    const movie = await fetcher.get<MovieResponse>(`/${movieId}`);
    const fullMovie = MovieMapper.fromMovieDbToEntity(movie);
    return fullMovie;
  } catch (error) {
    throw new Error(`Cannot get movie by id: ${movieId}`);
  }
};
