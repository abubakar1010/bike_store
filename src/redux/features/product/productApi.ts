import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/products`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: `/products`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useUpdateProductMutation,
} = productApi;
