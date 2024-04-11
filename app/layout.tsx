import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import "./globals.css"
import { AuthContextProvider } from "./authContent"
import GlobalProvider from "./GlobalProvider"

const inter = Work_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Caption This",
  description: "Get your memes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="images/logo_icon_white.png" className="fill " />
      </head>
      <body className={inter.className}>
        <GlobalProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </GlobalProvider>
      </body>
    </html>
  )
}
