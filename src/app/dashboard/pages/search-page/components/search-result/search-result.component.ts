import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, scan } from 'rxjs';
import { MovieShortInfo } from 'src/app/models/movie-info.model';
import { SearchResult } from '../../models/search-result.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @Output() scrolled = new EventEmitter<void>();
  @Output() movieClicked = new EventEmitter<MovieShortInfo>();
  @Input() searchResults!: SearchResult;

  constructor() {}

  ngOnInit(): void {}

  onScroll() {
    this.scrolled.emit();
  }

  onMovieClicked(movie: MovieShortInfo) {
    this.movieClicked.emit(movie);
  }
}
