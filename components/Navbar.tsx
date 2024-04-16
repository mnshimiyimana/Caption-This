"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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

  // const handleLogout = () => {
  //   localStorage.clear()
  //   sessionStorage.clear()
  //   router.push(routes.logout)
  // }
  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    router.replace(routes.logout)
    window.location.replace(routes.logout) // Replace current location with the logout route
  }

  const handleSearch = (value: string) => {
    // onSearch(value)
    onSearch(value)
    dispatch(storeSearchKey(value))

    // Invoke the onSearch prop with the search value
  }

  return (
    <div className="flex justify-between lg:px-24 md:px-16 px-8 py-2 border-b-2 border-black shadow-lg bg-gray sticky top-0 max-h-screen z-20 animate-fade-down animate-delay-300 animate-once  ">
      <div className="flex gap-3">
        <Image
          src={"/images/logo_icon_white.png"}
          alt={"logo"}
          width={28}
          height={2}
          className="max-h-[40px]"
        />
        <Link
          className="text-lg font-medium items-center md:flex hidden"
          href={"/home"}
        >
          CaptionThis
        </Link>
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
      <div className="flex gap-2 duration-150">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex gap-3 cursor-pointer"
        >
          <Image
            src={userData?.picture}
            alt={"Profile picture"}
            width={100}
            height={20}
            className="object-cover rounded-full w-10 h-10 border-2 border-white"
          />
          <p className="text-sm items-center md:flex hidden ">
            {userData?.lastName}
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
