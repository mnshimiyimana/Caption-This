import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_URL = process.env.NEXT_PUBLIC_API
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: headers => {
    const localStorageAPI = localStorage.getItem("login_token") ?? ""
    if (localStorageAPI) {
      headers.set("authorization", `Bearer ${localStorageAPI}`)
    }
    return headers
  },
})

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["GetCaptions", "GetMemes", "AddLits", "GetUserMemes"],
  endpoints: () => ({}),
})
