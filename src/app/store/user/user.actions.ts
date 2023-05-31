import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
export const USER_LOAD_START = '[user] load start';
export const USER_LOAD_SUCCESS = '[user] load success';
export const USER_LOAD_FAIL = '[user] load FAIL';

export const userLoadStart = createAction(USER_LOAD_START);
export const userLoadSuccess = createAction(
  USER_LOAD_SUCCESS,
  props<{ user: User }>()
);
export const userLoadFail = createAction(
  USER_LOAD_FAIL,
  props<{ message: string }>()
);
