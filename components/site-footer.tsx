"use client"

import { usePathname } from "next/navigation"

import Section5 from "@/app/frontend/sections/Section5"

const hiddenPrefixes = ["/backend/backoffice"]

export function SiteFooter() {
  const pathname = usePathname()

  if (hiddenPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return null
  }

  return <Section5 />
}
