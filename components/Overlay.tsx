"use client"
import React, { useState } from "react"
import { useCreateCaptionsMutation } from "@/lib/services/captionEndpoints"
import { Button, Input, Modal } from "antd"
import Theme from "./theme/Theme"
import InputStyle from "./theme/Input"
import Style from "./theme/Modal"

const Overlay = (props: any) => {
  const { TextArea } = Input
  const { closeOverlay } = props
  const [value, setValue] = useState("")
  const [createCaption, { isLoading: isCaptionCreating }] =
    useCreateCaptionsMutation()

  const handleCaption = async () => {
    if (!value.trim()) return
    try {
      await createCaption({ memeId: props.data.id || "", text: value })
      setValue("")
      closeOverlay()
    } catch (error) {
      console.error("Failed to create caption:", error)
    }
  }

  return (
    <Style>
      <Modal
        visible={true}
        onCancel={closeOverlay}
        footer={[
          <>
            <Theme>
              <Button key="cancel" onClick={closeOverlay} className="bg-white">
                Cancel
              </Button>
            </Theme>

            <Theme>
              <Button
                key="submit"
                type="primary"
                loading={isCaptionCreating}
                onClick={async () => await handleCaption()}
                className="bg-pink"
              >
                {isCaptionCreating ? "Creating..." : "Done"}
              </Button>
            </Theme>
          </>,
        ]}
      >
        <div className="grid gap-3 items-center">
          <h1 className="text-2xl text-white font-medium">Your Caption</h1>
          <div>
            {
              <img
                src={props?.data?.imageSmall}
                alt="Meme"
                width={80}
                height={80}
              />
            }
          </div>
          <InputStyle>
            <TextArea
              rows={4}
              className="bg-[#44525C] hover:bg-[#44525C] text-white"
              placeholder=""
              value={value}
              onChange={(e: {
                target: { value: React.SetStateAction<string> }
              }) => setValue(e.target.value)}
            />
          </InputStyle>
        </div>
      </Modal>
    </Style>
  )
}

export default Overlay
