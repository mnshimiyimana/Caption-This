import { api } from "./api"

const captionEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getCaptions: builder.query<any, { memeId: string; page: number }>({
      providesTags: ["GetCaptions"],
      query: ({ memeId, page }) => ({
        params: { memeId, page: page ?? 0 },
        url: `/captions/meme/${memeId}`,
      }),
    }),

    createCaptions: builder.mutation<any, { memeId: string; text: string }>({
      invalidatesTags: ["GetCaptions"],
      query: ({ memeId, text }) => ({
        url: `/captions/meme/${memeId}`,
        method: "POST",
        body: { text },
      }),
    }),

    getUserCaptions: builder.query<any, { userId: string }>({
      providesTags: ["GetCaptions"],
      query: ({ userId }) => ({
        params: { userId },
        url: `/captions/user/${userId}`,
      }),
    }),

    deleteCaptions: builder.mutation<any, { captionId: string }>({
      invalidatesTags: ["GetMemes"],
      query: ({ captionId }) => ({
        url: `/caption/${captionId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetCaptionsQuery,
  useCreateCaptionsMutation,
  useGetUserCaptionsQuery,
  useDeleteCaptionsMutation,
} = captionEndpoints
