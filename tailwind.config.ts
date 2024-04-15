import type { Config } from "tailwindcss"
import { Button } from "antd"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        grey: "#44525C",
        pink: "#CB245C",
        gray: "#262626",
        slate: "#4F4F4F",
      },

      Button: {
        defaultHoverBg: "#CB245C",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
}
export default config
