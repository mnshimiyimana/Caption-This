import React from "react"
import { ConfigProvider } from "antd"

interface ThemeProps {
  children: React.ReactNode
}

const Theme: React.FC<ThemeProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: "#CB245C",

        // Alias Token
      },
    }}
  >
    {children}
  </ConfigProvider>
)

export default Theme
