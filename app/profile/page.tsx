"use client"
import React from "react"
import Section1 from "@/components/Section1"
import Navbar from "@/components/Navbar"
import Profile from "@/components/Profile"
import Edit from "@/components/Edit"
import Captions from "@/components/Captions"
import { withPrivateRoute } from "@/components/protected-route"

function Page() {
  return (
    <div>
      <div className="bg-gray h-full">
        <Navbar
          onSearch={function (value: string): void {
            throw new Error("Function not implemented.")
          }}
        />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:px-24 md:px-16 px-10">
          <Section1 />
          <div className="pt-12">
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

export default withPrivateRoute(Page)
