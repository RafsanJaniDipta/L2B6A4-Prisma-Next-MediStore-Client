"use client"

/**
 * SmoothScrollProvider
 * ─────────────────────
 * Initialises Lenis smooth scroll exactly as the design file (motion.js) does:
 *   • duration: 1.15, custom exponential easing
 *   • Lenis RAF driven by GSAP ticker (single rAF loop, no double-tick)
 *   • ScrollTrigger kept in sync via lenis.on("scroll", ScrollTrigger.update)
 */

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // Expose globally so GsapMotionInit can access if needed
    ;(window as any).__lenis = lenis

    // Keep ScrollTrigger positions in sync
    lenis.on("scroll", ScrollTrigger.update)

    // Single rAF loop via GSAP ticker
    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerFn)
      lenis.destroy()
      delete (window as any).__lenis
    }
  }, [])

  return <>{children}</>
}
