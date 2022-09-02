import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { filter, take, tap, Observable } from 'rxjs';
import { LoginStatusService } from '../auth/services/login-status.service';

@Injectable({
  providedIn: 'root',
})
export class CanViewDashboardGuard implements CanLoad {
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
      tap((loginStatus) => {
        if (!loginStatus) {
          this.router.navigate(['/']);
        }
      })
    );
  }
}
