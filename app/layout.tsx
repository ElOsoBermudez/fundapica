import { Geist, Geist_Mono, Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { buttonVariants } from "@/components/ui/button"
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
        <ThemeProvider>
          <div className="flex min-h-svh flex-col">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.webp"
                    alt="Fundapica"
                    width={140}
                    height={44}
                    priority
                    className="h-11 w-auto"
                  />
                </Link>
                <Link
                  href="/backend/backoffice"
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                    className: "bg-[#0a0a0a] text-[#fafafa] hover:bg-[#1a1a1a]",
                  })}
                >
                  Backoffice
                </Link>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
