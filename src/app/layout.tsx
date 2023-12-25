import "@seethe/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import { type PropsWithChildren } from "react"

export const metadata = {
  title: "Does Ontario have non-dance rhythm games yet?",
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className="h-full">
      <body className={`${GeistSans.className} h-full bg-white dark:bg-gradient-to-br from-slate-800 to-slate-900 text-white`}>
          {children}
      </body>
    </html>
  )
}

export default RootLayout
