import { createFeatureSelector, createSelector, } from "@ngrx/store";
import { InitialStateAuth } from "./auth.state";

export const userSelector = createFeatureSelector<InitialStateAuth>("user");

export const getUserState = createSelector(userSelector, (state) => {
    return state;
})

export const isAuthenticated = createSelector(userSelector, (state) => {
    return state.isAuthenticated;
})