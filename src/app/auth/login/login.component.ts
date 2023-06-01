import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, skipWhile, tap } from 'rxjs';
import { authLoginStart } from '../state/auth.actions';
import { getUserState } from '../state/auth.selector';
import { InitialStateAuth } from '../state/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user$: Observable<InitialStateAuth>;
  constructor(private store: Store, private router: Router, private toast: ToastrService) { }
  ngOnInit(): void {
    this.user$ = this.store.select(getUserState);
  }

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  onAuthFormSubmit() {
    if (this.authForm.invalid) {
      return;
    } else {
      const values = this.authForm.value;
      this.store.dispatch(
        authLoginStart({ email: values.email, password: values.password })
      );
      this.user$.pipe(skipWhile(values => [null, false].includes(values.isAuthenticated)), map(value => {

        if (value.isAuthenticated) {
          this.toast.success("Login success!",)
          this.router.navigateByUrl("/");
        }
      })).subscribe(() => { })
    }
  }
}
