import { api } from "./api"

const litsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    PutLits: builder.mutation<any, { captionId: string }>({
      query: ({ captionId }) => ({
        url: `/lits/caption/${captionId}`,
        method: "PUT",
      }),
    }),
  }),
})

export const { usePutLitsMutation } = litsEndpoints
