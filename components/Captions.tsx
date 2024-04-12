import React, { useState } from "react"
import {
  FireOutlined,
  FireFilled,
  ShareAltOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import { useGetUserCaptionsQuery } from "@/lib/services/captionEndpoints"
import useUserData, { type UserData } from "@/lib/hooks/handleUserDetails"
import { skipToken } from "@reduxjs/toolkit/query"

function Captions() {
  const userData = useUserData() as UserData

  const {
    data: captionsData,
    isLoading: isCaptionsLoading,
    isError: isCaptionsError,
  } = useGetUserCaptionsQuery(
    userData?.id ? { userId: userData?.id } : skipToken,
  )

  const [deleteSuccess, setDeleteSuccess] = useState(false)

  if (isCaptionsLoading) return <div>Loading...</div>
  if (isCaptionsError) return <div>Error fetching data</div>

  if (!captionsData) {
    return <div>No captions available</div>
  }

  return (
    <div className="py-10">
      {deleteSuccess && (
        <div
          className="bg-black border border-gray text-pink px-4 py-3 text-xs rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">
            {" "}
            The caption was successfully deleted.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-pink"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setDeleteSuccess(false)}
            >
              <title>Close</title>
              <path d="M14.354 5.354a2 2 0 10-2.828 2.828L10 7.828l-1.525 1.525a2 2 0 10-2.828-2.828L7.172 5.5 5.647 3.975a2 2 0 00-2.828 2.828L4.172 8.328 2.646 9.854a2 2 0 102.828 2.828L7.172 11.5l1.525 1.525a2 2 0 102.828-2.828L9.828 8.328l1.525-1.525a2 2 0 012.828 2.828L11.828 11.5l1.525 1.525a2 2 0 102.828-2.828L14.354 8.328l1.525-1.525a2 2 0 10-2.825-2.825z" />
            </svg>
          </span>
        </div>
      )}
      <div className="space-y-6">
        <div className="text-xl font-semibold">
          My Captions ({captionsData.data.count})
        </div>
        <div className="space-y-12">
          {captionsData.data.captions.map((caption: any, index: number) => (
            <div key={index} className="bg-black space-y-4 rounded-md">
              <img
                src={caption?.meme?.imageSmall}
                alt="Meme"
                className="w-full object-cover rounded-t-md"
              />
              <div className="p-4 space-y-4">
                <p className="font-medium text-justify">{caption?.text}</p>
                <div className="flex justify-between">
                  {caption?.litCount ? (
                    <FireFilled style={{ color: "#CB245C" }} />
                  ) : (
                    <FireOutlined />
                  )}
                  <span className="flex gap-3">
                    <ShareAltOutlined />
                    <DeleteOutlined />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Captions
