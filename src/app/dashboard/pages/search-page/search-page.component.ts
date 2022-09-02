import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchQuery } from './models/search-query.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  onSearchQueryChange(searchQuery$: Observable<SearchQuery>) {
    searchQuery$.subscribe(console.log);
  }
}
