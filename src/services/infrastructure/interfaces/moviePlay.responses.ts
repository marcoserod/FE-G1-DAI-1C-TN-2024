export interface NowPlayingResponse {
  movies: Result[];
}
export interface Result {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: Date;
  vote_average: number;
  vote_count: number;
}

export interface FullMovieResult {
  movie: Movie;
  movieTrailer: MovieTrailer;
  movieCast: MovieCast;
  genreList: Genre[];
  imageList: ImageList;
  userRating: number | null;
  isUserFavorite: boolean;
  metadata: null;
}

export interface ImageList {
  images: Image[];
}

export interface Image {
  file_path: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: Date;
  vote_average: number;
  vote_count: number;
  runtime: number;
  tagline: string;
}

export interface MovieCast {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  popularity: number;
  character: null | string;
  order: number;
  department: null | string;
  job: null | string;
  known_for_department: string;
  original_name: string;
  profile_path: null | string;
  cast_id: number;
  credit_id: string;
}

export interface MovieTrailer {
  link: string;
}

interface Genre {
  id: number;
  name: string;
}
