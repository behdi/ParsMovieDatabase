import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchQuery } from '../models/search-query.model';
import { SearchResult } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = environment.movie;

  constructor(private http: HttpClient) {}

  public search(query: SearchQuery, page: number) {
    let params = new HttpParams();

    params = params
      .set('name', query.name)
      .append('year', query.year)
      .append('page', page);

    return this.http.get<SearchResult>(`${this.apiUrl}/Search`, { params });
  }
}
