import { api } from "./api"

const authEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.query({
      query: ({ token }: { token: string }) => ({
        params: {
          tokenId: token,
        },
        url: "/auth/google",
      }),
    }),
  }),
})

export const { useLazyLoginQuery } = authEndpoints
