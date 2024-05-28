export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  poster: string;
}

export interface FullMovie extends Movie {
  genres: string[];
  duration: number;
  subtitle: string;
  ratingCount: number;
}
