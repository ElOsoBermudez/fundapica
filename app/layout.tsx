import { Geist, Geist_Mono, Montserrat } from "next/font/google"

import "./globals.css"
import { LenisProvider } from "@/components/lenis-provider"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        geistSans.variable,
        fontMono.variable,
        montserrat.variable,
        "font-sans",
      )}
    >
      <body>
        <LenisProvider />
        <ThemeProvider>
          <div className="flex min-h-svh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
