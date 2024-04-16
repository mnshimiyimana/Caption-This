import { ConfigProvider } from "antd"
import React from "react"

interface ThemeProps {
  children: React.ReactNode
}

const Style: React.FC<ThemeProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      components: {
        Modal: {
          contentBg: "#1D1D1D",
          colorIcon: "white",
          colorIconHover: "white",
          titleColor: "white",
          headerBg: "#1D1D1D",
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
)

export default Style
