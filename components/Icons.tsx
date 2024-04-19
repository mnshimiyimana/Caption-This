import React from "react"
import {
  FacebookFilled,
  GooglePlusOutlined,
  TwitterOutlined,
} from "@ant-design/icons"

function Icons({ onClick = () => null }: { onClick: () => void }) {
  return (
    <div
      className="flex gap-6 items-center justify-center"
      style={{ fontSize: "24px" }}
    >
      <IconWrapper onClick={() => null}>
        <FacebookFilled className="cursor-pointer" />
      </IconWrapper>
      <IconWrapper onClick={onClick}>
        <GooglePlusOutlined className="cursor-pointer" />
      </IconWrapper>
      <IconWrapper onClick={() => null}>
        <TwitterOutlined className="cursor-pointer" />
      </IconWrapper>
    </div>
  )
}

interface IconProps {
  children: React.ReactNode
  onClick: () => void
}

function IconWrapper({ children, onClick = () => null }: IconProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center rounded-full w-12 h-12 p-4 border-white border-2 cursor-pointer hover:scale-110 duration-100"
    >
      {children}
    </div>
  )
}

export default Icons
