import { api } from "./api"

const memeEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getMemes: builder.query<
      any,
      { page?: number; search?: string; size?: number }
    >({
      providesTags: ["GetMemes"],
      query: ({ page, search, size }) => ({
        params: {
          page: page ?? 0,
          size: size ?? 10,
          search: search ?? "",
        },
        url: `/memes`,
      }),
    }),

    getMemesID: builder.query<any, { memeId: string }>({
      query: DTO => ({
        params: {
          memeId: DTO.memeId,
        },
        url: "/memes{memeId}",
      }),
    }),

    createMeme: builder.mutation<
      any,
      { imageSmall: string; imageLarge: string; tags: string }
    >({
      invalidatesTags: ["GetMemes"],
      query: DTO => ({
        body: {
          imageLarge: DTO.imageLarge,
          imageSmall: DTO.imageSmall,
          tags: DTO.tags,
        },
        url: "/memes",
        method: "POST",
      }),
    }),
  }),
})

export const { useGetMemesQuery, useCreateMemeMutation, useGetMemesIDQuery } =
  memeEndpoints
