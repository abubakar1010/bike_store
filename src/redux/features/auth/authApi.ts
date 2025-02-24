import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createUser: builder.mutation({
			query: (credential) => ({
				url: "/users/create-user",
				method: "POST",
				body: credential,
			}),
		}),
		login: builder.mutation({
			query: (credential) => ({
				url: "/auth/login",
				method: "POST",
				body: credential,
			}),
		}),
		changePassword: builder.mutation({
			query: (data) => ({
				url: "/auth/change-password",
				method: "POST",
				body: data,
			}),
		}),
		updateUserStatus: builder.mutation({
			query: (payload) => ({
				url: "/auth/update-user-status",
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),
	}),
});

export const {
	useLoginMutation,
	useChangePasswordMutation,
	useUpdateUserStatusMutation,
	useCreateUserMutation,
} = authApi;
