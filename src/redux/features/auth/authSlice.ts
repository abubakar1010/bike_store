import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type TUSer = {
	token: string;
	role: string;
	iat: number;
	exp: number;
};

type TAuth = {
	user: null | TUSer;
	token: null | string;
};

const initialState: TAuth = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser(
			state,
			actions: PayloadAction<{ user: TUSer; token: string }>
		) {
			const { token, user } = actions.payload;
			state.token = token;
			state.user = user;
		},
		logout(state) {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setUser, logout } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectRole = (state: RootState) => state.auth.user?.role;

export const authReducer = authSlice.reducer;
