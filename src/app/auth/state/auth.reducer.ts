import { createReducer, on } from '@ngrx/store';
import { authLoginFail, authLoginStart, authLoginSuccess, loadUser, loadUserFailed, loadUserStart } from './auth.actions';
import { initialState } from './auth.state';

const _authReducer = createReducer(initialState,
  on(loadUserStart, (state) => {
    return { ...state, loading: true };
  }),
  on(loadUserFailed, (state) => {
    return { ...state, isAuthenticated: false };
  }),
  on(loadUser, (state, actions) => {
    const { user } = actions;
    return {
      ...state,
      user: user,
      loading: false,
      isAuthenticated: true,
    }
  }),
  on(authLoginStart, (state, actions) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(authLoginSuccess, (state, actions) => {
    return {
      ...state,
      user: actions.user,
      token: actions.token,
      loading: false,
      isAuthenticated: true,
    }
  }),
  on(authLoginFail, (state, actions) => {
    return {
      ...state,
      loading: false,
    }
  }),
);
export function authReducer(state, actions) {
  return _authReducer(state, actions);
}
