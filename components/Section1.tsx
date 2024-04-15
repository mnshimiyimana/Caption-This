import React, { useEffect, useState } from "react"
import { HomeOutlined, FireOutlined, UserOutlined } from "@ant-design/icons"
import Posts from "./Posts"
import Link from "next/link"
import { usePathname } from "next/navigation"

function Section1() {
  const [activeLink, setActiveLink] = useState("")
  const pathname = usePathname()
  const icons = [
    { icon: <HomeOutlined />, title: "Home", destination: "/home" },
    { icon: <FireOutlined />, title: "Featured", destination: "/featured" },
    { icon: <UserOutlined />, title: "My Profile", destination: "/profile" },
  ]
  useEffect(() => {
    const processedPathname = pathname
    setActiveLink(processedPathname || "/home")
  }, [pathname])

  return (
    <div className="bg-gray space-y-6 md:sticky top-28 max-h-[150px] pb-10 animate-fade-up animate-delay-300 animate-once">
      <div>
        {icons.map((item, index) => (
          <div
            key={index}
            className={`flex text-md gap-2 space-y-3 font-base ${activeLink === item.destination ? "text-pink font-bold" : ""}`}
          >
            <Link href={item.destination} className="flex gap-3 space-y-3">
              <p className="pt-3">{item.icon}</p>
              <span>{item.title}</span>
            </Link>
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
