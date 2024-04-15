"use client"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/constants"

export function withPrivateRoute(Component: any) {
  return function WithAuth(props: any) {
    const router = useRouter()

    const isAuthenticated = (): boolean => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("login_token")
        return !!token
      }
      return false
    }

    if (!isAuthenticated()) {
      router.push(routes.login)
      return null
    }

    return <Component {...props} />
  }
}
