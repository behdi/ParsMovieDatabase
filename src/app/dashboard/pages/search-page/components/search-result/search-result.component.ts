import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, scan } from 'rxjs';
import { SearchResult } from '../../models/search-result.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @Output() scrolled = new EventEmitter<void>();
  @Input() searchResults!: Observable<SearchResult>;

  constructor() {}

  ngOnInit(): void {}

  onScroll() {
    this.scrolled.emit();
  }
}
