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
    { icon: <FireOutlined />, title: "My Memes", destination: "/featured" },
    { icon: <UserOutlined />, title: "My Captions", destination: "/profile" },
  ]
  useEffect(() => {
    const processedPathname = pathname
    setActiveLink(processedPathname || "/home")
  }, [pathname])

  return (
    <div className="bg-gray space-y-6 md:sticky md:top-20 md:pt-0 pt-8 max-h-[150px] pb-10 animate-fade-up animate-delay-300 animate-once">
      <div>
        {icons.map((item, index) => (
          <div
            key={index}
            className={`flex text-md gap-2 space-y-3 font-base `}
          >
            <Link href={item.destination} className="flex gap-3 space-y-3">
              <p className="pt-3 font-extrabold">{item.icon}</p>
              <span
                className={`${activeLink === item.destination ? "text-pink font-bold" : ""}`}
              >
                {item.title}
              </span>
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
