import { Geist, Geist_Mono, Montserrat } from "next/font/google"

import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { LenisProvider } from "@/components/lenis-provider"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatWidget } from "@/components/chat-widget"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils";
import { Toaster } from "sonner"

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
        <LanguageProvider>
        <ThemeProvider>
          <div className="flex min-h-svh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#0a0a0a",
                color: "#fafafa",
                border: "none",
              },
            }}
          />
          <ChatWidget />
        </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
