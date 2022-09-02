export interface MovieInfo {
  title: string;
  year: number;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
}

export interface MovieShortInfo {
  title: string;
  year: number;
  imdbID: string;
  type: string;
  poster: string;
}
