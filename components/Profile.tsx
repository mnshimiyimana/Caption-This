"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { PlusOutlined } from "@ant-design/icons"
import useUserData from "@/lib/hooks/handleUserDetails"

const Profile: React.FC = () => {
  const numbers = [
    { count: 43, title: "Followers" },
    { count: 234, title: "Likes" },
    { count: 16, title: "Captions" },
  ]
  const ddeta = useUserData()

  return (
    <div className="md:block hidden sticky top-24 max-h-[200px] animate-fade-up animate-delay-300 animate-once ">
      <div className="bg-[#1D1D1D] w-72 p-6 grid justify-center gap-8 rounded-md">
        <div className="grid justify-center relative">
          <div className="flex items-center">
            {ddeta?.picture && (
              <Image
                src={ddeta?.picture}
                alt={`${ddeta?.firstName} ${ddeta?.lastName}`}
                width={100}
                height={100}
                className="object-cover rounded-full w-12 h-12 border-2 border-white"
              />
            )}
            <div className="bottom-0 right-20 absolute">
              <PlusOutlined
                className="bg-pink rounded-full w-3 h-3 grid justify-center"
                style={{ fontSize: "10px" }}
              />
            </div>
          </div>
        </div>
        <div className="grid justify-center">
          {ddeta?.firstName && ddeta?.lastName && (
            <p className=" font-bold text-center">
              {ddeta?.firstName} {ddeta?.lastName}
            </p>
          )}
          {ddeta?.email && (
            <span className="text-slate text-xs">{ddeta?.email}</span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 justify-center">
          {numbers.map((item, index) => (
            <div key={index} className="gap-2 font-medium">
              <p className="font-semibold grid justify-center">{item.count}</p>
              <span className="text-slate text-xs grid justify-center">
                {item.title}
              </span>
            </div>
          ))}
        </div>
        <div className="grid justify-center">
          <Link href={""} className="text-pink text-xs">
            Settings
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
