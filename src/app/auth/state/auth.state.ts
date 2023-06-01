import { UserInterface } from "./interfaces/user.interface";

export interface InitialStateAuth {
    user: Partial<UserInterface>,
    token: string,
    loading: boolean,
    isAuthenticated: boolean,
}
export const initialState: InitialStateAuth = {
    user: {},
    token: null,
    loading: false,
    isAuthenticated: null,
};
