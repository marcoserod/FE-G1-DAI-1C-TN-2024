import {FullMovie, Movie} from '../../core/entities/movie.entity';
import type {MovieResponse, Result} from '../interfaces/movie-db.responses';

export class MovieMapper {
  static fromMovieDbResultToEntity(result: Result): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: new Date(result.release_date),
      rating: result.vote_average,
      poster: `http://image.tmdb.org/t/p/w500${result.poster_path}`,
      backdrop: `http://image.tmdb.org/t/p/w500${result.backdrop_path}`,
    };
  }

  static fromMovieDbToEntity(movie: MovieResponse): FullMovie {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: new Date(movie.release_date),
      rating: movie.vote_average,
      poster: `http://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `http://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      genres: movie.genres.map(genre => genre.name),
      duration: movie.runtime,
      budget: movie.budget,
      subtitle: movie.tagline,
      productionCompanies: movie.production_companies.map(
        company => company.name,
      ),
      ratingCount: movie.vote_count,
    };
  }
}
