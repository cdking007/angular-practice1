import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.state';
import { userLoadFail, userLoadStart, userLoadSuccess } from './user.actions';
import { state } from '@angular/animations';

const _userReducer = createReducer(
  initialState,
  on(userLoadStart, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(userLoadSuccess, (state, actions) => {
    return {
      ...state,
      ...actions.user,
      loading: false,
    };
  }),
  on(userLoadFail, (state, actions) => {
    return {
      ...state,
      message: actions.message,
      loading: false,
    };
  })
);
export function userReducer(state, actions) {
  return _userReducer(state, actions);
}
