"use client"
import React, { useRef } from "react"
import { FileImageOutlined } from "@ant-design/icons"

const UploadImageComponent = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      // console.log("Uploaded file:", file)
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
      <FileImageOutlined
        onClick={handleUploadClick}
        style={{ cursor: "pointer" }}
      />
    </div>
  )
}

export default UploadImageComponent
