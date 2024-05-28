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

export interface FullMovieResponse {
  movie: Result;
  movieTrailer: MovieTrailer;
  movieCast: MovieCast;
  imageList: ImageList;
}

export interface ImageList {
  images: Image[];
}

export interface Image {
  file_path: string;
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
