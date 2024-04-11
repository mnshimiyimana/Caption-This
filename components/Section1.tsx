import React from "react"
import { HomeOutlined, FireOutlined, UserOutlined } from "@ant-design/icons"
import Posts from "./Posts"

function Section1() {
  const icons = [
    { icon: <HomeOutlined />, title: "Home", destination: "/home" },
    { icon: <FireOutlined />, title: "Featured", destination: "/featured" },
    { icon: <UserOutlined />, title: "My Profile", destination: "/profile" },
  ]

  return (
    <div className="bg-gray space-y-6 md:sticky top-28 max-h-screen pb-10">
      <div>
        {icons.map((item, index) => (
          <div key={index} className="flex text-md gap-2 space-y-3 font-medium">
            <a href={item.destination} className="flex gap-3 space-y-3">
              <p className="pt-3">{item.icon}</p>
              <span>{item.title}</span>
            </a>
          </div>
        ))}
      </div>

      <div>
        <Posts />
      </div>
    </div>
  )
}

export default Section1
