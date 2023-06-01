import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authLoginFail, authLoginStart, authLoginSuccess, loadUser, loadUserFailed, loadUserStart } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private cookie: CookieService, private store: Store, private toast: ToastrService) { }
  loadUser$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadUserStart), mergeMap((action) => {
      return this.authService.getCurrentUser().pipe(map(value => {
        return loadUser({ user: value.data.user });
      }), catchError((err) => {
        // this.cookie.remove("token");
        this.store.dispatch(loadUserFailed());
        return EMPTY;
      }))
    }))
  })

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authLoginStart),
      exhaustMap((action) => {
        const { email, password } = action;
        return this.authService.loginUser(email, password).pipe(map((value) => {
          this.cookie.put("token", value.data.token, {
            expires: new Date(Date.now() + (24 * 60 * 60 * 1000)),
          })
          return loadUserStart();
        }),
          catchError((error) => {
            if (error.error) {
              const err = error.error;
              this.toast.error(err.message);
            } else {
              this.toast.error("something went wrong!");
            }
            this.store.dispatch(authLoginFail());
            authLoginFail();
            return EMPTY;
          }),
        );
      })
    );
  });
}
