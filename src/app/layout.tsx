import "@seethe/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import { type PropsWithChildren } from "react"
import { cn } from "@seethe/utils/cn"

export const metadata = {
  title: "Does Ontario have non-dance rhythm games yet?",
  manifest: "/manifest.json",
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html
      lang="en"
      className="h-full w-full bg-white from-slate-800 to-slate-900 dark:bg-gradient-to-br"
    >
      <body
        className={cn(GeistSans.className, "h-full text-black dark:text-white")}
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
