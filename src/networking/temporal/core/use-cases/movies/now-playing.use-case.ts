import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {NowPlayingResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {Movie} from '../../entities/movie.entity';

export const moviesNowPloyingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');
    return nowPlaying.results.map(result =>
      MovieMapper.fromMovieDbResultToEntity(result),
    );
  } catch (error) {
    throw new Error('Error fetching movies - NowPlaying');
  }
};
