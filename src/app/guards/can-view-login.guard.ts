import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { filter, Observable, take, map, tap } from 'rxjs';
import { LoginStatusService } from '../auth/services/login-status.service';

@Injectable({
  providedIn: 'root',
})
export class CanViewLoginGuard implements CanLoad {
  constructor(
    private loginStatus: LoginStatusService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loginStatus.getUserLoginStatus().pipe(
      filter((status): status is boolean => status !== null),
      take(1),
      map((isLoggedIn) => !isLoggedIn),
      tap((canViewLoginPage) => {
        if (!canViewLoginPage) {
          this.router.navigate(['/', 'dashboard']);
        }
      })
    );
  }
}
