import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args.length > 0) {
          args.forEach((item) => {
            params.append(item.field, item.value);
          });
        }

        return {
          url: "/category",
          method: "GET",
          params,
        };
      },
    }),
    addCategory: builder.mutation({
      query: (payload) => ({
        url: "/category/create",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery } = categoryApi;
