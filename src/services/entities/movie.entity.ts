import {Cast} from './cast.entity';

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  poster: string;
}

export interface FavoriteMovie {
  id: number;
  title: string;
  year: Date;
  description: string;
  poster: string;
}

export interface FullMovie extends Movie {
  trailer: string;
  genres: string[];
  duration: number;
  subtitle: string;
  ratingCount: number;
  userRating: number | null;
  isUserFavorite: boolean;
  cast: Cast[];
  direction: Cast[];
  images: string[];
}
