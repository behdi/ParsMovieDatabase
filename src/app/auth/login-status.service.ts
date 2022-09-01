import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageKeys } from '../models/local-storage-keys';
import jwt_decode from 'jwt-decode';
import { AuthDecodedInfo } from './models/auth-info.model';

@Injectable({
  providedIn: 'root',
})
export class LoginStatusService {
  private _isLoggedIn$ = new BehaviorSubject<boolean | null>(null);

  constructor() {}

  public verifyCurrentUser() {
    /**
     * As we don't have an endpoint to verify the validity
     * of the current token, I manually validate it's expiration
     * in this method.
     * However, this is NOT recommended as token validation and
     * authorization in general, should always be handled by the
     * server.
     */
    const token = this.getUserToken();

    if (this.isTokenExpired(token)) {
      this.onInvalidLogin();
      this.clearUserToken();
      return;
    }

    this.changeLoginStatusTo(true);
  }

  public onUserLoginSuccessful(token: string) {
    this.changeLoginStatusTo(true);
    this.storeUserToken(token);
  }

  public onInvalidLogin() {
    this.changeLoginStatusTo(false);
  }

  public getUserLoginStatus() {
    return this._isLoggedIn$.asObservable();
  }

  private changeLoginStatusTo(isLoggedIn: boolean) {
    this._isLoggedIn$.next(isLoggedIn);
  }

  private storeUserToken(token: string) {
    localStorage.setItem(LocalStorageKeys.AuthToken, token);
  }

  private getUserToken() {
    return localStorage.getItem(LocalStorageKeys.AuthToken);
  }

  private clearUserToken() {
    localStorage.removeItem(LocalStorageKeys.AuthToken);
  }

  private isTokenExpired(token: string | null) {
    if (!token) return true;

    const decodedToken = jwt_decode<AuthDecodedInfo>(token);
    return Date.now() <= decodedToken.exp;
  }
}