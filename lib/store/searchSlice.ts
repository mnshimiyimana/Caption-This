import { createSlice } from "@reduxjs/toolkit"

interface SearchState {
  searchKey: string
}

const initialState: SearchState = {
  searchKey: "",
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    storeSearchKey(state, action) {
      state.searchKey = action.payload
    },
  },
})

export const { storeSearchKey } = searchSlice.actions
export default searchSlice.reducer
