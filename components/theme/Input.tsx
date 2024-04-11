import { ConfigProvider } from "antd"
import React from "react"

interface ThemeProps {
  children: React.ReactNode
}

const InputStyle: React.FC<ThemeProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      components: {
        Input: {
          colorTextPlaceholder: "white",
          colorPrimaryHover: "[#1D1D1D]",
          colorBgContainer: "[#1D1D1D]",
          colorPrimary: "[#1D1D1D]",
          hoverBorderColor: "[#1D1D1D]",
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
)

export default InputStyle
