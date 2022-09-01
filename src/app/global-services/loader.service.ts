import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  setIsLoadingTo(isItLoading: boolean) {
    this._isLoading$.next(isItLoading);
  }

  get isLoading$() {
    return this._isLoading$.asObservable();
  }
}
