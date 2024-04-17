// "use client"
// import {
//   useContext,
//   createContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react"
// import { auth } from "@/app/firebaseConfig"
// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithPopup,
//   User,
// } from "firebase/auth"

// interface AuthContextValue {
//   user: User | null
//   googleSignIn: () => void
// }

// const AuthContext = createContext<AuthContextValue>({
//   user: null,
//   googleSignIn: () => {},
// })

// interface AuthContextProps {
//   children: ReactNode
// }

// export const AuthContextProvider = ({ children }: AuthContextProps) => {
//   const [user, setUser] = useState<User | null>(null)
//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider()
//     signInWithPopup(auth, provider)
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser)
//     })
//     return () => unsubscribe()
//   }, [])

//   return (
//     <AuthContext.Provider value={{ user, googleSignIn }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const UserAuth = () => {
//   return useContext(AuthContext)
// }

"use client"
import React, { useContext, createContext, useState, useEffect } from "react"
import { auth } from "@/app/firebaseConfig"
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  type User as FirebaseAuthUser,
} from "firebase/auth"

interface AuthContextValue {
  user: FirebaseAuthUser | null
  googleSignIn: () => Promise<void> // Changed the return type to Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  googleSignIn: async () => {
    // console.log("Something...")
  },
})

interface AuthContextProps {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<FirebaseAuthUser | null>(null)
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider) // Await the signInWithPopup call
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [setUser])

  return (
    <AuthContext.Provider value={{ user, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
