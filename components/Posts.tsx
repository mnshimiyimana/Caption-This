import React from "react"
import Image from "next/image"
import { Button } from "antd"
import Theme from "./theme/Theme"

function Posts() {
  const images = [
    "/images/man.jpg",
    "/images/person.jpg",
    "/images/man.jpg",
    "/images/person.jpg",
    "/images/man.jpg",
    "/images/person.jpg",
  ]

  return (
    <div>
      <div className="bg-[#1D1D1D] w-72 p-5 rounded-md space-y-8 ">
        <div className="space-y-3">
          <h2 className="font-medium">From the people you know</h2>
          <p className="text-slate text-xs">Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {images.map((src, index) => (
            <div key={index}>
              <Image
                src={src}
                alt={`Image ${index}`}
                width={200}
                height={200}
                className="rounded-lg w-16 h-12 object-cover"
              />
            </div>
          ))}
        </div>
        <div>
          <Theme>
            <Button
              type="primary"
              className="bg-pink text-xs font-normal "
              block
            >
              SEE ALL POST
            </Button>
          </Theme>
        </div>
      </div>
    </div>
  )
}

export default Posts
