import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { MovieInfo } from '../../../../models/movie-info.model';
import { SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class MovieInfoResolver implements Resolve<MovieInfo> {
  constructor(
    private searchService: SearchService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MovieInfo> {
    const movieId = route.paramMap.get('movieId');
    if (!movieId) {
      this.router.navigate(['/', 'dashboard', 'search']);
      return EMPTY;
    }

    return this.searchService.getMovieInfo(movieId).pipe(
      catchError(() => {
        this.router.navigate(['/', 'dashboard', 'search']);
        this.toastr.error('چنین اطلاعاتی موجود نیست.');
        return EMPTY;
      })
    );
  }
}
