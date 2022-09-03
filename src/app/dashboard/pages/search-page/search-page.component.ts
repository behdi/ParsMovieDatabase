import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  combineLatest,
  EMPTY,
  Observable,
  scan,
  switchMap,
  tap,
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
    if (this.searchResults) return;

    this.searchResults = combineLatest([
      searchQuery$.pipe(tap(() => this.searchService.resetPageIndex())),
      this.searchService.pageIndex,
    ]).pipe(
      switchMap(([query, index]) => {
        return this.searchService
          .search(query, index)
          .pipe(catchError(() => EMPTY));
      }),
      scan((acc, curr) => {
        return {
          results: [...(acc.results ?? []), ...(curr.results ?? [])],
          totalResults: acc.totalResults,
        };
      })
    );
  }

  onScroll() {
    this.searchService.increasePageIndex();
  }

  onMovieClicked(movie: MovieShortInfo) {
    this.router.navigate([movie.imdbID], { relativeTo: this.activatedRoute });
  }
}
