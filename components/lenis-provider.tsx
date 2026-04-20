"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export function LenisProvider() {
  useEffect(() => {
    // Create a single Lenis instance attached to the window so the
    // smooth scroll applies to the whole document, not just one section.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    let animationFrameId = 0

    // Drive Lenis with requestAnimationFrame so it stays in sync with the
    // browser paint cycle and existing animations remain smooth.
    const raf = (time: number) => {
      lenis.raf(time)
      animationFrameId = window.requestAnimationFrame(raf)
    }

    animationFrameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [])

  return null
}
