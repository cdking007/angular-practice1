import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, skipWhile, take, tap, } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { getUserState } from './auth/state/auth.selector';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanMatch {
  constructor(private authService: AuthService, private store: Store, private router: Router) { }
  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userState = this.store.select(getUserState);
    return userState.pipe(skipWhile(state => state.isAuthenticated === null), take(1), map((auth) => {
      if (!auth.isAuthenticated) {
        this.router.navigateByUrl("/auth/login");
        return false;
      } else {
        return true;
      }
    }));
  }
}
