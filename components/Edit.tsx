"use client"
import React from "react"
import Image from "next/image"
import { Button } from "antd"
import Theme from "./theme/Theme"
import useUserData, { type UserData } from "@/lib/hooks/handleUserDetails"

const Edit: React.FC = () => {
  const ddeta = useUserData() as UserData

  return (
    <div>
      <div className="bg-black py-6 px-4 rounded-md">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div>
              {ddeta?.picture && (
                <Image
                  src={ddeta?.picture}
                  alt={`${ddeta?.firstName} ${ddeta?.lastName}`}
                  width={100}
                  height={20}
                  className="object-cover rounded-full w-10 h-10 border-2 border-white"
                />
              )}
            </div>
            <div className="text-xs grid items-center justify-center">
              {ddeta?.firstName && ddeta?.lastName && (
                <p className="font-semibold">{`${ddeta?.firstName}_${ddeta?.lastName}`}</p>
              )}
              {ddeta?.email && (
                <span className="text-grey">{ddeta?.email}</span>
              )}
            </div>
          </div>
          <div>
            <Theme>
              <Button
                type="primary"
                className="bg-pink text-xs font-normal"
                block
              >
                EDIT PROFILE
              </Button>
            </Theme>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
