import React from "react"
import { ConfigProvider } from "antd"

interface ThemeProps {
  children: React.ReactNode
}

const Theme: React.FC<ThemeProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      components: {
        // Seed Token
        Button: {
          colorPrimaryHover: "#CB245C",
          colorPrimary: "#1D1D1D",
          colorPrimaryBorder: "#1D1D1D",
          colorPrimaryActive: "#CB245C",
        },

        // Alias Token
      },
    }}
  >
    {children}
  </ConfigProvider>
)

export default Theme
