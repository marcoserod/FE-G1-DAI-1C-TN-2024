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
