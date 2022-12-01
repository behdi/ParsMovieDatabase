import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../../models/user-info.model';
import { LoginStatusService } from './login-status.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.auth;

  constructor(
    private http: HttpClient,
    private loginStatus: LoginStatusService
  ) {}

  public login(userInfo: UserInfo) {
    return this.http
      .post(`${this.apiUrl}`, userInfo, {
        responseType: 'text',
      })
      .pipe(
        tap({
          next: (token: string) => {
            this.loginStatus.onUserLoginSuccessful(token);
          },
          error: () => {
            this.loginStatus.onLogOutOrInvalidLogin();
          },
        })
      );
  }

  public logOut() {
    this.loginStatus.logOutCurrentUser();
  }
}
