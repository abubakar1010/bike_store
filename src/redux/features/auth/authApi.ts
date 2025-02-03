import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
         createUser: builder.mutation({
            query: (credential) => ({
                url: "/users/create-user",
                method: "POST",
                body: credential
            })
        }),
        login: builder.mutation({
            query: (credential) => ({
                url: "/auth/login",
                method: "POST",
                body: credential
            })
        }),
        boom: builder.mutation({
            query: () => ({
                url: "/users/679dde2d68025dd82f5361c2",
                method: "PATCH",
                body: {name: "boom"}
            })
        }),
        changePassword: builder.mutation({
			query: (data) => ({
				url: "/auth/change-password",
				method: "POST",
				body: data,
			}),
		}),
    })
})

export const {useLoginMutation, useChangePasswordMutation, useBoomMutation} = authApi