import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  combineLatest,
  EMPTY,
  map,
  Observable,
  repeat,
  scan,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs';
import { LoaderService } from 'src/app/global-services/loader.service';
import { MovieShortInfo } from 'src/app/models/movie-info.model';
import { SearchQuery } from './models/search-query.model';
import { SearchResult } from './models/search-result.model';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  searchResults?: Observable<SearchResult>;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {}

  onSearchQueryChange(searchQuery$: Observable<SearchQuery>) {
    this.searchResults = combineLatest([
      searchQuery$.pipe(tap(() => this.searchService.resetPageIndex())),
      this.searchService.pageIndex,
    ]).pipe(
      switchMap(([query, index]) => {
        return this.searchService.search(query, index).pipe(
          map((searchResult): { result: SearchResult; index: number } => {
            return {
              result: searchResult,
              index: index,
            };
          }),
          catchError(() => EMPTY)
        );
      }),
      scan(
        (acc, { result, index }) => {
          return {
            results:
              index === 1
                ? result.results ?? []
                : [...acc.results, ...(result.results ?? [])],
            totalResults: acc.totalResults,
          } as SearchResult;
        },
        {
          results: [] as MovieShortInfo[],
          totalResults: 0,
        }
      )
    );
  }

  onScroll() {
    this.searchService.increasePageIndex();
  }

  onMovieClicked(movie: MovieShortInfo) {
    this.router.navigate([movie.imdbID], { relativeTo: this.activatedRoute });
  }
}
