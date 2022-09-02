import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieInfo } from 'src/app/models/movie-info.model';
import { environment } from 'src/environments/environment';
import { SearchQuery } from '../models/search-query.model';
import { SearchResult } from '../models/search-result.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = environment.movie;
  private _currIndex = 1;
  private _pageIndex$ = new BehaviorSubject<number>(this._currIndex);

  constructor(private http: HttpClient) {}

  public search(query: SearchQuery, page: number) {
    let params = new HttpParams();

    params = params
      .set('name', query.name)
      .append('year', query.year)
      .append('page', page);

    return this.http.get<SearchResult>(`${this.apiUrl}/Search`, { params });
  }

  public getMovieInfo(imdbId: string) {
    return this.http.get<MovieInfo>(`${this.apiUrl}/${imdbId}`);
  }

  public increasePageIndex() {
    this._currIndex++;
    this._pageIndex$.next(this._currIndex);
  }

  public resetPageIndex() {
    this._currIndex = 1;
    this._pageIndex$.next(this._currIndex);
  }

  get pageIndex() {
    return this._pageIndex$.asObservable();
  }
}
