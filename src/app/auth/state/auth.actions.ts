import { createAction, props } from '@ngrx/store';
import { UserInterface } from './interfaces/user.interface';
export const AUTH_STORE = 'auth';

export const AUTH_LOGIN_START = '[auth] login start';
export const AUTH_LOGIN_SUCCESS = '[auth] login success';
export const AUTH_LOGIN_FAIL = '[auth] login failed';


export const LOAD_USER_START = "[auth] load user start";
export const LOAD_USER = '[auth] load user'
export const LOAD_USER_FAIL = "[auth] load user fail";

export const authLoginStart = createAction(
  AUTH_LOGIN_START,
  props<{ email: string; password: string }>()
);
export const authLoginSuccess = createAction(AUTH_LOGIN_SUCCESS, props<{ user: UserInterface, token: string; isAuthenticated: boolean; }>());
export const authLoginFail = createAction(AUTH_LOGIN_FAIL);

export const loadUserStart = createAction(LOAD_USER_START);
export const loadUser = createAction(LOAD_USER, props<{ user: UserInterface }>());
export const loadUserFailed = createAction(LOAD_USER_FAIL);