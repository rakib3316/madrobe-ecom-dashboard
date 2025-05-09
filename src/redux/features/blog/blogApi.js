import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args.length > 0) {
          args.forEach((item) => {
            params.append(item.field, item.value);
          });
        }

        return {
          url: "/blog",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const { useGetBlogsQuery } = blogApi;
