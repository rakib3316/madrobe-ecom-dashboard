import { baseApi } from "../../api/baseApi";

const classRoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClassRooms: builder.mutation({
      query: (payload) => ({
        url: "/class/query/get",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllClassRoomsMutation } = classRoomApi;
