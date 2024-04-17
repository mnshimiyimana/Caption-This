import React, { useRef, useState } from "react"
import Image from "next/image"
import { FileImageOutlined, CloseOutlined } from "@ant-design/icons"
import { Button, Input, Form } from "antd"
import axios from "axios"
import { useCreateMemeMutation } from "@/lib/services/memeEndpoints"
import Theme from "./theme/Theme"
import InputStyle from "./theme/Input"

function Tags() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>(["Entanglement"])
  const [createMeme] = useCreateMemeMutation()
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isCreating, setIsCreating] = useState<boolean>(false)

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("Uploaded file:", file)
      setSelectedImage(file)
      setImageUrl(URL.createObjectURL(file))
      // Reset tags when a new image is selected
      setTags(["Entanglement"])
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag) && tag.trim() !== "") {
      setTags([...tags, tag.trim()])
    }
  }

  const handleRemoveTag = (tagIndex: number) => {
    const updatedTags = [...tags]
    updatedTags.splice(tagIndex, 1)
    setTags(updatedTags)
  }

  const [form] = Form.useForm()

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputValue = (e.target as HTMLInputElement).value.trim()
      if (inputValue !== "") {
        handleAddTag(inputValue)
        form.resetFields()
        if (inputRef.current) {
          inputRef.current.value = ""
        }
      }
    }
  }

  const handleUploadAndPost = async () => {
    if (selectedImage && tags.length > 0) {
      try {
        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", selectedImage)
        formData.append("upload_preset", "Caption_This")
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/duityzq3k/upload",
          formData,
        )
        if (response.status === 200) {
          setIsCreating(true)
          const allTags = tags.join(",")
          const sendData = {
            imageSmall: response?.data?.secure_url,
            imageLarge: response?.data?.secure_url,
            tags: allTags,
          }

          await createMeme(sendData).unwrap()
          setTags([])
          setSelectedImage(null)
          setImageUrl(null)
          setIsUploading(false)
          setIsCreating(false)
        }
      } catch (error) {
        console.error("Error uploading image:", error)
        setIsUploading(false)
        setIsCreating(false)
      }
    }
  }

  return (
    <div className="bg-gray space-y-1 md:pt-12 animate-fade-up animate-delay-300 animate-once ">
      <div className="flex gap-7 text-xs bg-[#1D1D1D] p-5 rounded-md">
        {selectedImage && imageUrl && (
          <div className="w-20">
            <Image
              src={imageUrl}
              alt={"Selected Meme"}
              width={200}
              height={200}
              className="rounded"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2 rounded p-2 max-h-auto w-full">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="tag px-2 py-1 flex justify-between gap-2 max-w-80 max-h-7 bg-gray rounded"
            >
              {tag}
              <CloseOutlined
                style={{ fontSize: "10px", cursor: "pointer" }}
                onClick={() => {
                  handleRemoveTag(index)
                }}
              />
            </div>
          ))}
        </div>
        <div className="space-y-2 w-80">
          <Form form={form} name="add-tag">
            <Form.Item name="tag">
              <InputStyle>
                <Input
                  className="bg-[#1D1D1D] hover:bg-[#1D1D1D] text-white text-xs pt-2 border-none focus:ring-0"
                  placeholder="Add tags"
                  onKeyPress={handleInputKeyPress}
                  autoFocus
                />
              </InputStyle>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="bg-[#1D1D1D] flex justify-between p-5 rounded-md">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          autoFocus
        />
        <FileImageOutlined
          onClick={handleUploadClick}
          className="cursor-pointer"
        />
        <Theme>
          <Button
            type="primary"
            className="bg-pink text-xs font-normal px-5"
            onClick={handleUploadAndPost}
            loading={isUploading || isCreating}
          >
            {isCreating && isUploading ? " Creating... " : "POST"}
          </Button>
        </Theme>
      </div>
    </div>
  )
}

export default Tags
