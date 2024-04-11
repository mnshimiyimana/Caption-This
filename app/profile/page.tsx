"use client"
import React from "react"
import Section1 from "@/components/Section1"
import Navbar from "@/components/Navbar"
import Profile from "@/components/Profile"
import Edit from "@/components/Edit"
import Captions from "@/components/Captions"

function page() {
  return (
    <div>
      <div className="bg-gray h-full">
        <Navbar
          onSearch={function (value: string): void {
            throw new Error("Function not implemented.")
          }}
        />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:px-24 px-12 pt-12">
          <Section1 />
          <div>
            <Edit />
            <Captions />
          </div>
          <div className="lg:flex  hidden justify-end">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
