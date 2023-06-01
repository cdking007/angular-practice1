import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { ResponseInterface } from 'src/app/interfaces/response.interface';
import { loadUser } from '../state/auth.actions';
import { getUserState } from '../state/auth.selector';
import { UserInterface } from '../state/interfaces/user.interface';

export interface Data {
  user: UserInterface
  token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedIn$ = new BehaviorSubject(null);
  constructor(private http: HttpClient, private cookieService: CookieService, private store: Store) { }

  loginUser(email, password) {
    return this.http.post<ResponseInterface<Data>>('/auth/login', {
      email,
      password,
    })
  }

  getCurrentUser() {
    return this.http.get<ResponseInterface<{ user: UserInterface }>>("/users/me");
  }
}
