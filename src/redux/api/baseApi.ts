/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	BaseQueryApi,
	BaseQueryFn,
	createApi,
	DefinitionType,
	FetchArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
	baseUrl: "https://bike-store-server-ebon.vercel.app/api",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;

		if (token) {
			headers.set("authorization", token);
		}
		return headers;
	},
});

const baseQueryWithAuth: BaseQueryFn<
	FetchArgs,
	BaseQueryApi,
	DefinitionType
> = async (args, api, extraOption): Promise<any> => {
	const response = await baseQuery(args, api, extraOption);
	if (response.error?.status === 401) {
		api.dispatch(logout());
	}
	return response;
};

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQueryWithAuth,
	tagTypes: ["products", "orders", "users"],
	endpoints: () => ({}),
});
