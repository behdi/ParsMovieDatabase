import { MovieShortInfo } from 'src/app/models/movie-info.model';

export interface SearchResult {
  results: MovieShortInfo[] | null;
  totalResults: number;
}
