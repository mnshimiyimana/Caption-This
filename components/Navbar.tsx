"use client"
import React, { useState } from "react"
import Image from "next/image"
import { SearchOutlined, LogoutOutlined } from "@ant-design/icons"
import { Input } from "antd"
import InputStyle from "./theme/Input"
import useUserData, { type UserData } from "@/lib/hooks/handleUserDetails"
import { routes } from "@/lib/constants"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux" // Import useDispatch
import { storeSearchKey } from "@/lib/store/searchSlice"

function Navbar({ onSearch }: { onSearch: (value: string) => void }) {
  const [hovered, setHovered] = useState(false)
  const userData = useUserData() as UserData
  const router = useRouter()
  const dispatch = useDispatch()

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    router.push(routes.logout)
  }

  const handleSearch = (value: string) => {
    // onSearch(value)
    onSearch(value)
    dispatch(storeSearchKey(value))

    // Invoke the onSearch prop with the search value
  }

  return (
    <div className="flex justify-between lg:px-24 md:px-12 px-8 py-2 border-b-2 border-black shadow-lg bg-gray sticky top-0 max-h-screen z-20 ">
      <div className="flex gap-6">
        <Image
          src={"/images/logo_icon_white.png"}
          alt={"logo"}
          width={30}
          height={9}
        />
        <p className="text-xl font-medium items-center md:flex hidden">
          CaptionThis
        </p>
      </div>
      <div className="lg:w-96 w-auto text-white">
        <InputStyle>
          <Input
            placeholder="Type a tag to search..."
            size="large"
            className="bg-grey w-full text-white hover:bg-grey border-grey text-sm"
            prefix={<SearchOutlined />}
            onChange={(e: { target: { value: string } }) =>
              handleSearch(e.target.value)
            }
          />
        </InputStyle>
      </div>
      <div className="flex gap-2 ">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex gap-3"
        >
          <Image
            src={userData?.picture}
            alt={"Profile picture"}
            width={100}
            height={20}
            className="object-cover rounded-full w-10 h-10 border-2 border-white"
          />
          <p className="text-sm items-center md:flex hidden ">
            {userData?.firstName}_{userData?.lastName}
          </p>
          {hovered && (
            <LogoutOutlined
              className="text-white cursor-pointer"
              onClick={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
