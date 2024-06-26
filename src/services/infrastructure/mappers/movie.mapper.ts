import {Formatter} from '../../../assets/helpers/formatter';
import {FavoriteMovie, FullMovie, Movie} from '../../entities/movie.entity';
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

  static fromMoviePlayResultToFavorite(result: Result): FavoriteMovie {
    return {
      id: result.id,
      title: result.title,
      year: Formatter.year(result?.release_date),
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      description: result.overview,
    };
  }

  static fromMoviePlayToEntity(result: FullMovieResult): FullMovie {
    const {
      movie,
      movieCast: {cast, crew},
      genreList,
      movieTrailer,
      imageList,
      userRating,
      isUserFavorite,
    } = result;
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      trailer: movieTrailer?.link,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      genres: genreList?.map(genre => genre.name) || [],
      duration: movie.runtime,
      subtitle: movie.tagline,
      ratingCount: movie.vote_count,
      userRating,
      isUserFavorite,
      cast: cast?.map(actor => ({
        id: actor.id,
        name: actor.name,
        character: actor.character || '',
        avatar: actor.profile_path
          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
          : 'https://i.stack.imgur.com/l60Hf.png',
      })),
      images: imageList?.images?.map(
        image => `https://image.tmdb.org/t/p/w500${image.file_path}`,
      ),
      direction: crew
        ?.map(actor => {
          if (actor.job === 'Director') {
            return {
              id: actor.id,
              name: actor.name,
              character: actor.character || '',
              avatar: actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : 'https://i.stack.imgur.com/l60Hf.png',
            };
          }
          return;
        })
        .filter(actor => actor),
    };
  }
}
