"use client"
import React from "react"
import Navbar from "@/components/Navbar"
import Profile from "@/components/Profile"
import Section1 from "@/components/Section1"
import Tags from "@/components/Tags"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const onSearch = (value: string) => {
    // Handle search logic here
  }

  return (
    <div className="bg-[#262626] min-h-screen max-h-full">
      <Navbar onSearch={onSearch} />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:px-24 md:px-16 px-4">
        <Section1 />
        <div>
          <Tags />
          {children}
        </div>
        <div className="lg:flex hidden justify-end">
          <Profile />
        </div>
      </div>
    </div>
  )
}

export default LandingLayout
