import React, { useState, useEffect } from "react"
import {
  LeftOutlined,
  RightOutlined,
  FireOutlined,
  FireFilled,
  ShareAltOutlined,
  CommentOutlined,
} from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import Theme from "./theme/Theme"
import { useGetCaptionsQuery } from "../lib/services/captionEndpoints"
import { usePutLitsMutation } from "@/lib/services/litsEndpoints"
function Carousel(props: any) {
  const [currentCaptions, setCurrentCaptions] = useState<any>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shareCaptionToolTip, setShareCaptionToolTip] =
    useState("Share this caption")

  const { data: captionsData } = useGetCaptionsQuery({
    memeId: props.data.id,
    page: props.page,
  })

  useEffect(() => {
    if (captionsData) {
      setCurrentCaptions(captionsData?.data?.captions)
    }
  }, [captionsData])

  const captions = currentCaptions || []

  useEffect(() => {
    console.log("Captions data:", captionsData?.data?.captions)
  }, [captionsData])

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % captions.length
    setCurrentIndex(newIndex)
  }

  const goToPreviousSlide = () => {
    const newIndex = (currentIndex - 1 + captions.length) % captions.length
    setCurrentIndex(newIndex)
  }

  const [putLitsMutation] = usePutLitsMutation()

  const handleLikeCaption = (captionId: string) => {
    const updatedCaptions: any[] = []

    currentCaptions.forEach((caption: any) => {
      if (caption.id === captionId) {
        updatedCaptions.push({ ...caption, litCount: caption.litCount ? 0 : 1 })
      } else {
        updatedCaptions.push(caption)
      }

      setCurrentCaptions(updatedCaptions)
    })

    putLitsMutation({ captionId })
      .unwrap()
      .then(() => null)
      .catch(err => console.log("An error happened while litting: ", err))
    // const currentCaption = captions.filter(
    //   (cap: { id: string }) => cap.id === captionId,
    // )
  }

  const onCopyCaption = () => {
    navigator.clipboard
      .writeText(captions[currentIndex]?.text)
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-3">
        {captions.length > 0 && (
          <Theme>
            <Button
              type="primary"
              shape="circle"
              icon={<LeftOutlined />}
              onClick={goToPreviousSlide}
            />
          </Theme>
        )}
        {captions.length > 0 && (
          <div>
            <div className="font-medium">
              <span className="text-sm text-center">
                {captions[currentIndex]?.text}
              </span>
            </div>
          </div>
        )}
        {captions.length > 0 && (
          <Theme>
            <Button
              type="primary"
              shape="circle"
              icon={<RightOutlined />}
              onClick={goToNextSlide}
            />
          </Theme>
        )}
      </div>
      <div className="bg-grey rounded-md flex justify-between p-2">
        <div className="flex gap-2">
          {captions[currentIndex]?.litCount ? (
            <Tooltip title="Unlit this caption">
              <FireFilled
                onClick={() =>
                  handleLikeCaption(captions[currentIndex]?.id || "")
                }
                style={{ color: "#CB245C" }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Lit this caption">
              <FireOutlined
                onClick={() =>
                  handleLikeCaption(captions[currentIndex]?.id || "")
                }
              />
            </Tooltip>
          )}
          {/* <p>{captions[currentIndex]?.litCount}</p> */}
        </div>

        <div className="text-sm">
          <p>
            {captions.length > 0
              ? `${currentIndex + 1}/${captions.length}`
              : "0/0"}
          </p>
        </div>
        <div className="flex gap-2">
          <Tooltip title={shareCaptionToolTip}>
            <ShareAltOutlined
              className="cursor-pointer"
              onClick={onCopyCaption}
            />
          </Tooltip>

          <Tooltip title="Add caption to this meme">
            <CommentOutlined
              className="cursor-pointer"
              onClick={props.onClick}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Carousel
