import "@seethe/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import { type PropsWithChildren } from "react"
import { cn } from "@seethe/utils/cn"
import { Viewport } from "next"

export const metadata = {
  title: "Does Ontario have non-dance rhythm games yet?",
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className="h-full w-full bg-white dark:bg-black">
      <body
        className={cn(GeistSans.className, "h-full text-black dark:text-white")}
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
