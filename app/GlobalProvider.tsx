// "use client"
// import store from "@/lib/store/store"
// import React, { ReactNode } from "react"
// import { Provider } from "react-redux"

// const GlobalProvider = ({ children }: { children: ReactNode }) => {
//   // const ddeta = useUserData() as UserData

//   return <Provider store={store}>{children}</Provider>
// }

// export default GlobalProvider

"use client"
import React from "react"
import { Provider } from "react-redux"
import store from "@/lib/store/store"

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}

export default GlobalProvider
