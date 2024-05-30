import {FullMovie, Movie} from '../../entities/movie.entity';
import {FullMovieResult, Result} from '../interfaces/moviePlay.responses';

export class MovieMapper {
  static fromMoviePlayResultToEntity(result: Result): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: result.release_date,
      rating: result.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
    };
  }

  static fromMoviePlayToEntity(result: FullMovieResult): FullMovie {
    const {
      movie,
      movieCast: {cast},
    } = result;
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      genres: movie.genres?.map(genre => genre.name) || [],
      duration: movie.runtime,
      subtitle: movie.tagline,
      ratingCount: movie.vote_count,
      cast: cast?.map(actor => ({
        id: actor.id,
        name: actor.name,
        character: actor.character || '',
        avatar: actor.profile_path
          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
          : 'https://i.stack.imgur.com/l60Hf.png',
      })),
    };
  }
}