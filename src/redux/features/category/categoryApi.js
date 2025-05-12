import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (payload) => ({
        url: "/category/create",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAddCategoryMutation } = categoryApi;
