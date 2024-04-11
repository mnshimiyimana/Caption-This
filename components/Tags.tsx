// "use client"
// import React from "react"
// import { useRef, useState } from "react"
// import Image from "next/image"
// import { FileImageOutlined, CloseOutlined } from "@ant-design/icons"
// import { Button, Input, Form } from "antd"
// import axios from "axios"
// import { useCreateMemeMutation } from "@/lib/services/memeEndpoints"
// import Theme from "./theme/Theme"
// import InputStyle from "./theme/Input"

// function Tags() {
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const inputRef = useRef<HTMLInputElement>(null) // Ref for input field
//   const [showInput, setShowInput] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<File | null>(null)
//   const [imageUrl, setImageUrl] = useState<string | null>(null)
//   const [tags, setTags] = useState<string[]>(["Entanglement"])
//   const [createMeme, { isLoading: isMemeCreating }] = useCreateMemeMutation()

//   const handleFileInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("Uploaded file:", file)
//       setSelectedImage(file)
//       setImageUrl(URL.createObjectURL(file))
//     }
//   }

//   const handleUploadClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click()
//     }
//   }

//   const handleAddTagClick = () => {
//     setShowInput(true)
//     if (inputRef.current) {
//       inputRef.current.focus() // Focus on input field when "Add Tags" is clicked
//     }
//   }

//   const handleAddTag = (tag: string) => {
//     if (!tags.includes(tag) && tag.trim() !== "") {
//       // Check if tag already exists and if it's not empty
//       setTags([...tags, tag.trim()])
//       setShowInput(true)
//       if (inputRef.current) {
//         inputRef.current.value = "" // Reset input field value after adding tag
//       }
//     }
//   }

//   const handleRemoveTag = (tagIndex: number) => {
//     const updatedTags = [...tags]
//     updatedTags.splice(tagIndex, 1)
//     setTags(updatedTags)
//   }

//   const [form] = Form.useForm()

//   const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       const inputValue = (e.target as HTMLInputElement).value.trim() // Trim the input value

//       if (inputValue !== "") {
//         // Check if the input value is not empty
//         handleAddTag(inputValue)
//         form.resetFields()

//         if (inputRef.current) {
//           inputRef.current.value = "" // Reset input field value after adding tag
//         }
//       }
//     }
//   }

//   const handleUploadAndPost = async () => {
//     if (selectedImage && tags.length > 0) {
//       setIsLoading(true)
//       try {
//         const formData = new FormData()
//         formData.append("file", selectedImage)
//         formData.append("upload_preset", "Caption_This") // Changed upload preset to Caption_This
//         const response = await axios.post(
//           "https://api.cloudinary.com/v1_1/duityzq3k/upload",
//           formData,
//         )
//         if (response.status === 200) {
//           // Split the tags string into an array
//           const allTags = tags.join(",")
//           const sendData = {
//             imageSmall: response?.data?.secure_url,
//             imageLarge: response?.data?.secure_url,
//             tags: allTags,
//           }

//           await createMeme(sendData).unwrap()
//           setTags([])
//           setSelectedImage(null)
//           setImageUrl(null)
//         }
//       } catch (error) {
//         console.error("Error uploading image:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//   }

//   return (
//     <div className="bg-gray space-y-1 ">
//       <div className="flex gap-7 text-xs bg-[#1D1D1D] p-5 rounded-md">
//         <div className="w-20">
//           {imageUrl && (
//             <Image
//               src={imageUrl}
//               alt={"Selected Meme"}
//               width={200}
//               height={200}
//               className="rounded-md"
//             />
//           )}
//         </div>
//         <div className="flex flex-wrap gap-2 rounded p-2 max-h-auto w-full">
//           {tags.map((tag, index) => (
//             <div
//               key={index}
//               className="tag px-2 py-1 flex justify-between gap-2 max-h-6 bg-gray rounded"
//             >
//               {tag}
//               <CloseOutlined
//                 style={{ fontSize: "10px", cursor: "pointer" }}
//                 onClick={() => handleRemoveTag(index)}
//               />
//             </div>
//           ))}
//         </div>
//         <div className="space-y-2 w-80">
//           <Form form={form} name="add-tag">
//             <Form.Item name="tag  ">
//               <InputStyle>
//                 <Input
//                   className="bg-[#1D1D1D] hover:bg-[#1D1D1D] text-white text-xs pt-2 border-none focus:ring-0"
//                   placeholder="Add tags"
//                   onKeyPress={handleInputKeyPress}
//                   autoFocus
//                 />
//               </InputStyle>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//       <div className="bg-[#1D1D1D] flex justify-between p-5 rounded-md">
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileInputChange}
//           style={{ display: "none" }}
//           autoFocus
//         />
//         <FileImageOutlined
//           onClick={handleUploadClick}
//           className="cursor-pointer"
//         />
//         <Theme>
//           <Button
//             type="primary"
//             className="bg-pink text-xs font-normal px-5"
//             onClick={handleUploadAndPost}
//           >
//             {" "}
//             {isMemeCreating ? " Creating... " : "POST"}
//           </Button>
//         </Theme>
//       </div>
//     </div>
//   )
// }

// export default Tags

"use client"
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
  const [createMeme, { isLoading: isMemeCreating }] = useCreateMemeMutation()

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("Uploaded file:", file)
      setSelectedImage(file)
      setImageUrl(URL.createObjectURL(file))
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
        const formData = new FormData()
        formData.append("file", selectedImage)
        formData.append("upload_preset", "Caption_This")
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/duityzq3k/upload",
          formData,
        )
        if (response.status === 200) {
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
        }
      } catch (error) {
        console.error("Error uploading image:", error)
      }
    }
  }

  return (
    <div className="bg-gray space-y-1 ">
      <div className="flex gap-7 text-xs bg-[#1D1D1D] p-5 rounded-md">
        <div className="w-20">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={"Selected Meme"}
              width={200}
              height={200}
              className="rounded-md"
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2 rounded p-2 max-h-auto w-full">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="tag px-2 py-1 flex justify-between gap-2 max-h-6 bg-gray rounded"
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
            onClick={() => handleUploadAndPost}
          >
            {" "}
            {isMemeCreating ? " Creating... " : "POST"}
          </Button>
        </Theme>
      </div>
    </div>
  )
}

export default Tags
