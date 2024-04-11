import React, { useState } from "react"
import { EllipsisOutlined } from "@ant-design/icons"
import Image from "next/image"
import Overlay from "./Overlay"
import Carousel from "./Carousel"

interface Meme {
  id: string
  imageSmall: string
  tags: string
  createdAt: string
  user: {
    firstName: string
    lastName: string
    picture: string
  }
}

interface DetailsProps {
  memes: any[]
}

function Details({ memes }: DetailsProps) {
  const [selectedMemeData, setSelectedMemeData] = useState<Meme | null>(null)
  const [showOverlay, setShowOverlay] = useState(false)

  const handleCommentIconClick = (meme: Meme) => {
    setShowOverlay(true)
    setSelectedMemeData(meme)
  }

  const handleClose = () => {
    setShowOverlay(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toDateString()
  }

  return (
    <div className="grid gap-5">
      {memes.map((meme: Meme) => (
        <div key={meme?.id} className="bg-black h-full rounded-md">
          <div>
            <img
              src={meme?.imageSmall}
              alt={`Image ${meme?.id}`}
              width={200}
              height={200}
              className="object-cover w-full rounded-md h-auto"
            />
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between gap-4">
              <div className="flex gap-5 justify-center items-center">
                <Image
                  src={meme?.user?.picture}
                  alt={`${meme?.user?.firstName} ${meme?.user?.lastName}`}
                  width={100}
                  height={100}
                  className="object-cover rounded-full w-10 h-10 border-2 border-white"
                />
                <div className="text-xs">
                  <p className="font-semibold">
                    {meme?.user?.firstName} {meme?.user?.lastName}
                  </p>
                  <span className="text-grey">
                    {formatDate(meme?.createdAt)}
                  </span>
                </div>
              </div>
              <div>
                <EllipsisOutlined />
              </div>
            </div>
            <div>
              <Carousel
                data={meme}
                onClick={() => handleCommentIconClick(meme)}
              />
              {/* Placeholder for Carousel */}
            </div>
          </div>
        </div>
      ))}
      {showOverlay && (
        <Overlay closeOverlay={handleClose} data={selectedMemeData} />
      )}
    </div>
  )
}

export default Details
