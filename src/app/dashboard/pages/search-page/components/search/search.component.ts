import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { SearchFormFields } from '../../models/search-form.model';
import { SearchQuery } from '../../models/search-query.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm = this.initSearchForm();

  @Output() searchQuery = new EventEmitter<Observable<SearchQuery>>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const searchQuery$ = this.searchForm.valueChanges.pipe(
      debounceTime(900),
      distinctUntilChanged()
    );

    this.searchQuery.emit(searchQuery$ as Observable<SearchQuery>);
  }

  private initSearchForm() {
    return this.fb.group({
      [SearchFormFields.MovieName]: ['', [Validators.required]],
      [SearchFormFields.ReleaseYear]: [
        this.currYear,
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(this.currYear),
          Validators.minLength(4),
          Validators.maxLength(4),
        ],
      ],
    });
  }

  get currYear() {
    return new Date().getFullYear();
  }

  get searchFormFields() {
    return SearchFormFields;
  }
}
