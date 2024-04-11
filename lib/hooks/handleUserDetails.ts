"use client"
// import { useState, useEffect } from "react"
// import { jwtDecode } from "jwt-decode"

// export interface UserData {
//   firstName: string
//   lastName: string
//   id: string
//   picture: string
//   email: string
//   // Add other user data properties here as needed
// }

// const useUserData = (): UserData | undefined => {
//   const [userData, setUserData] = useState<UserData | undefined>(undefined)

//   useEffect(() => {
//     const token = localStorage.getItem("login_token")
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token)
//         if (decodedToken) setUserData(decodedToken as UserData)
//       } catch (error) {
//         console.error("Error decoding token:", error)
//       }
//     }
//   }, []) // Empty dependency array to run effect only once

//   return userData
// }

// export default useUserData

import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

export interface UserData {
  firstName: string
  lastName: string
  id: string
  picture: string
  email: string
  // Add other user data properties here as needed
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
  }, []) // Empty dependency array to run effect only once

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
