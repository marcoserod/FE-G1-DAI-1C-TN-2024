import {Cast} from './cast.entity';

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  poster: string;
}

export interface FullMovie extends Movie {
  trailer: string;
  genres: string[];
  duration: number;
  subtitle: string;
  ratingCount: number;
  cast: Cast[];
}
