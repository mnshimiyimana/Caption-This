"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Icons from "@/components/Icons"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useLazyLoginQuery } from "@/lib/services/authEndpoints"
import { routes } from "@/lib/constants"
import { useRouter } from "next/navigation"
import { auth } from "../firebaseConfig"

function Login() {
  const router = useRouter()
  const [googleToken, setGoogleToken] = useState<string | undefined>() // Initialize data state
  const [login] = useLazyLoginQuery()

  useEffect(() => {
    if (googleToken) {
      login({ token: googleToken })
        .unwrap()
        .then((res: { data: { token: string } }) => {
          localStorage.setItem("login_token", res.data.token)
          router.push(routes.home)
        })
        .catch(err => {
          console.log("Failed to login with error: ", err)
        })
    }
  }, [googleToken, login])

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const idToken = await user.getIdToken()
      setGoogleToken(idToken)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="bg-gray h-screen">
      <div className="grid items-center justify-center gap-24 pt-52">
        <div className="space-y-8 grid items-center justify-center">
          <div className="flex items-center justify-center">
            <Image
              src={"/images/logo_icon_white.png"}
              alt={"Logo"}
              width={40}
              height={40}
            />
          </div>
          <p className="text-2xl font-medium">CaptionThis</p>
        </div>
        <div className="text-center space-y-8 border-t w-80 pt-12">
          <p> Sign in with</p>
          <Icons
            onClick={async () => {
              await handleSignIn()
            }}
          />
          <div>
            <p className="text-xs">Skip</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
