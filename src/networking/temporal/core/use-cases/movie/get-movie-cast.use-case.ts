import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieCreditResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {CastMapper} from '../../../infrastructure/mappers/cast.mapper';
import {Cast} from '../../entities/cast.entity';

export const getMovieCastUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<Cast[]> => {
  try {
    const {cast} = await fetcher.get<MovieCreditResponse>(
      `/${movieId}/credits`,
    );
    const actors = cast.map(CastMapper.fromMovieDbCastToEntity);
    return actors;
  } catch (error) {
    throw new Error(`Cannot get movie cast ${movieId}`);
  }
};
