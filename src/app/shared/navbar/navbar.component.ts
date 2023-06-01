import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { loadUserFailed } from 'src/app/auth/state/auth.actions';
import { getUserState } from 'src/app/auth/state/auth.selector';
import { InitialStateAuth } from 'src/app/auth/state/auth.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<InitialStateAuth>;
  constructor(private store: Store, private cookieService: CookieService, private router: Router) {

  }

  ngOnInit(): void {
    this.user$ = this.store.select(getUserState);
  }

  onLogout() {
    this.cookieService.remove("token");
    this.store.dispatch(loadUserFailed());
    this.router.navigateByUrl("/auth/login");
  }

}
