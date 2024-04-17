import React, { useEffect, useState } from "react"
import { DeleteOutlined } from "@ant-design/icons"
import {
  useGetUserMemesQuery,
  useDeleteMemesMutation,
} from "@/lib/services/memeEndpoints"
import useUserData, { type UserData } from "@/lib/hooks/handleUserDetails"
import { Tooltip, Button, Modal } from "antd"
import Theme from "./theme/Theme"
import Style from "./theme/Confirm"

function Featured() {
  const userData = useUserData() as UserData
  const [currentPage, setCurrentPage] = useState(0)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [memesState, setMemesState] = useState<any[]>([])
  const [deleteMemeMutation] = useDeleteMemesMutation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [memeIdToDelete, setMemeIdToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const { data, isLoading, isFetching } = useGetUserMemesQuery(
    {
      userId: userData?.id || "",
      page: currentPage,
    },
    {
      skip: !userData?.id,
    },
  )

  const memes = data?.data?.memes

  useEffect(() => {
    if (memes) {
      if (currentPage === 0) {
        setMemesState(memes)
      } else {
        setMemesState(prevMemes => [...prevMemes, ...memes])
      }
    } else {
      setMemesState([])
    }
  }, [memes])

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toDateString()
  }

  const handleDeleteCaption = (memeId: string) => {
    setMemeIdToDelete(memeId)
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
    setIsDeleting(false)
    setMemeIdToDelete(null)
  }

  const confirmDelete = () => {
    setIsDeleting(true)
    if (memeIdToDelete) {
      deleteMemeMutation({ memeId: memeIdToDelete })
        .unwrap()
        .then(res => {
          // console.log("RES: ", res)
          const newMemesState = memesState.filter(
            meme => meme.id !== memeIdToDelete,
          )
          setMemesState(newMemesState)
          setDeleteSuccess(true)
          setTimeout(() => setDeleteSuccess(false), 3000)

          handleCloseModal()
        })
        .catch(error => {
          console.error("Error deleting caption:", error)
          handleCloseModal()
        })
    }
  }

  return (
    <div className="py-10 animate-fade-up animate-delay-300 animate-once space-y-2">
      <Style>
        <Modal
          title="Confirm Deletion"
          visible={isModalVisible} // Change prop to visible
          onCancel={() => setIsModalVisible(false)}
          centered
          footer={[
            <>
              <Theme>
                <Button
                  key="cancel"
                  className="bg-white"
                  onClick={() => setIsModalVisible(false)}
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
                  onClick={confirmDelete}
                >
                  {isDeleting ? "Deleting..." : "Yes"}
                </Button>
              </Theme>
            </>,
          ]}
        >
          <p className="text-white">
            Are you sure you want to delete this meme?
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
            The meme was successfully deleted.
          </span>
        </div>
      )}
      <div className="space-y-6">
        <div className="text-xl font-semibold">My Memes ({memes?.length})</div>
        <div className="space-y-12 animate-fade-up animate-delay-300 animate-once">
          {memesState.length > 0 ? (
            memesState.map((meme, index) => (
              <div key={index} className="bg-black rounded-md">
                <img
                  src={meme.imageSmall}
                  alt="Meme"
                  className="w-full object-cover rounded-t-md"
                />
                <div className="p-3 space-y-3 pb-4">
                  <p className="flex gap-4">
                    <span className="font-bold text-pink">Tags:</span>
                    <span className="font-semibold pt-1 text-sm">
                      {meme.tags}
                    </span>
                  </p>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {meme.captionCount} captions
                    </span>
                    <span className="text-xs text-[#82878A]">
                      {formatDate(meme?.createdAt)}
                    </span>
                    <span className="flex gap-3">
                      <Tooltip title="Delete this caption">
                        <DeleteOutlined
                          onClick={() => handleDeleteCaption(meme.id)}
                        />
                      </Tooltip>
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No memes found</div>
          )}
        </div>
        {data?.data?.pages > currentPage + 1 && (
          <div className="flex justify-center">
            <Theme>
              <Button type="primary" onClick={handleLoadMore}>
                {isFetching && !isLoading ? "Loading..." : "Load More"}
              </Button>
            </Theme>
          </div>
        )}
      </div>
    </div>
  )
}

export default Featured
