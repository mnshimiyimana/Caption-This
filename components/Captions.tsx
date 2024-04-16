"use client"
import React, { useState } from "react"
import {
  FireOutlined,
  FireFilled,
  ShareAltOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import {
  useGetUserCaptionsQuery,
  useDeleteCaptionsMutation,
} from "@/lib/services/captionEndpoints"
import useUserData, { type UserData } from "@/lib/hooks/handleUserDetails"
import { skipToken } from "@reduxjs/toolkit/query"
import { Tooltip, Modal, Button } from "antd"
import Style from "./theme/Confirm"
import Theme from "./theme/Theme"

function Captions() {
  const userData = useUserData() as UserData
  const [shareCaptionToolTip, setShareCaptionToolTip] =
    useState("Share this caption")
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [captionIdToDelete, setCaptionIdToDelete] = useState<string | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const {
    data: captionsData,
    isLoading: isCaptionsLoading,
    isError: isCaptionsError,
    refetch: refetchCaptions,
  } = useGetUserCaptionsQuery(
    userData?.id ? { userId: userData?.id } : skipToken,
  )

  const [deleteCaptionMutation] = useDeleteCaptionsMutation()

  const handleDeleteCaption = async (captionId: string) => {
    setCaptionIdToDelete(captionId)
    setIsModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      setIsDeleting(true) // Set isDeleting to true when the deletion process starts
      if (captionIdToDelete) {
        await deleteCaptionMutation({ captionId: captionIdToDelete })
        setDeleteSuccess(true)
        refetchCaptions()
        setTimeout(() => setDeleteSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Error deleting caption:", error)
    } finally {
      setIsModalOpen(false)
      setCaptionIdToDelete(null)
      setIsDeleting(false)
    }
  }

  const onCopyCaption = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShareCaptionToolTip("Added to clipboard")
      })
      .catch(() => {
        setShareCaptionToolTip("Failed to add to clipboard!")
      })
    setTimeout(() => {
      setShareCaptionToolTip("Share this caption")
    }, 2000)
  }

  if (isCaptionsLoading) return <div>Loading...</div>
  if (isCaptionsError) return <div>Error fetching data</div>

  if (!captionsData) {
    return <div>No captions available</div>
  }

  return (
    <div className="py-10 animate-fade-up animate-delay-300 animate-once space-y-2">
      <Style>
        <Modal
          title="Confirm Deletion"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          centered
          footer={[
            <>
              <Theme>
                <Button
                  key="cancel"
                  className="bg-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  No
                </Button>
              </Theme>

              <Theme>
                <Button
                  key="submit"
                  type="primary"
                  className="bg-pink"
                  loading={isDeleting}
                  onClick={confirmDelete} // Attach confirmDelete function here
                >
                  {isDeleting ? "Deleting..." : "Yes"}
                </Button>
              </Theme>
            </>,
          ]}
        >
          <p className="text-white">
            Are you sure you want to delete this caption?
          </p>
        </Modal>
      </Style>

      {deleteSuccess && (
        <div
          className="bg-black border border-gray text-pink px-4 py-4 text-sm rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">
            {" "}
            The caption was successfully deleted.
          </span>
        </div>
      )}
      <div className="space-y-6">
        <div className="text-xl font-semibold">
          My Captions ({captionsData.data.count})
        </div>
        <div className="space-y-12">
          {captionsData.data.captions.map((caption: any, index: number) => (
            <div key={index} className="bg-black rounded-md">
              <img
                src={caption?.meme?.imageSmall}
                alt="Meme"
                className="w-full object-cover rounded-t-md"
              />
              <div className="p-3 space-y-3 pb-4">
                <p className="font-medium text-justify">{caption?.text}</p>
                <div className="flex justify-between">
                  {caption?.litCount ? (
                    <FireFilled style={{ color: "#CB245C" }} />
                  ) : (
                    <FireOutlined />
                  )}
                  <span className="flex gap-3">
                    <Tooltip title={shareCaptionToolTip}>
                      <ShareAltOutlined
                        onClick={() => onCopyCaption(caption.text)}
                      />
                    </Tooltip>
                    <Tooltip title="Delete this caption">
                      <DeleteOutlined
                        onClick={async () =>
                          await handleDeleteCaption(caption.id)
                        }
                      />
                    </Tooltip>
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
