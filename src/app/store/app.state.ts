import { authReducer } from "../auth/state/auth.reducer";
import { InitialStateAuth } from "../auth/state/auth.state";

export interface ReducerState {
    user: InitialStateAuth,
}

export const reducers = {
    user: authReducer,
}