import { Component, OnInit } from '@angular/core';
import { exhaustMap, Observable, switchMap } from 'rxjs';
import { SearchQuery } from './models/search-query.model';
import { SearchResult } from './models/search-result.model';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  private movieSearchEndpoint$!: Observable<SearchResult>;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  onSearchQueryChange(searchQuery$: Observable<SearchQuery>) {
    searchQuery$
      .pipe(exhaustMap((query) => this.searchService.search(query)))
      .subscribe(console.log);
  }
}
