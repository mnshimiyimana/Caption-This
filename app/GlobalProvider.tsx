"use client"
import React from "react"
import { Provider } from "react-redux"
import store from "@/lib/store/store"
import { useHandleAuth } from "@/lib/hooks/handleUserDetails"

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  useHandleAuth()
  return <Provider store={store}>{children}</Provider>
}

export default GlobalProvider
