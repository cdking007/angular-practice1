import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { Store } from '@ngrx/store';
import { isAuthenticated } from './auth/state/auth.selector';
import { CookieService } from 'ngx-cookie';
import { loadUser, loadUserFailed, loadUserStart } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  constructor(private store: Store, private authService: AuthService, private cookieService: CookieService) {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }
  ngOnInit(): void {
    if (this.cookieService.get("token")) {
      this.store.dispatch(loadUserStart());
    } else {
      this.store.dispatch(loadUserFailed());
    }
  }
}
