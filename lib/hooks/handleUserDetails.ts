"use client"

import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useDidMount } from "./useDidMount"
import { usePathname, useRouter } from "next/navigation"
import { routes } from "../constants"

export interface UserData {
  firstName: string
  lastName: string
  id: string
  picture: string
  email: string
}

const useUserData = (): UserData | undefined => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined)

  useEffect(() => {
    const token = localStorage.getItem("login_token")
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        if (decodedToken && isValidUserData(decodedToken)) {
          setUserData(decodedToken)
        } else {
          console.error("Invalid user data format")
        }
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }
  }, [])

  return userData
}

const isValidUserData = (data: any): data is UserData => {
  return (
    typeof data.firstName === "string" &&
    typeof data.lastName === "string" &&
    typeof data.id === "string" &&
    typeof data.picture === "string" &&
    typeof data.email === "string"
  )
}

export default useUserData

export const useHandleAuth = () => {
  const [didMount] = useDidMount()
  const pathname = usePathname()
  const router = useRouter()

  if (didMount) {
    const token = localStorage.getItem("login_token")

    if (!token) {
      router.push(routes.login)
    } else if (!pathname.includes("login")) {
      router.push(pathname)
    } else {
      router.push(routes.home)
    }
  }
}
