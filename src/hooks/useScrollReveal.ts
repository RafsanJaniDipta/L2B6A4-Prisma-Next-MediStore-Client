import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export interface ScrollRevealOptions {
  targets: string | string[]
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight"
  stagger?: number
  duration?: number
  delay?: number
  start?: string
  y?: number
}

/**
 * useScrollReveal
 * ────────────────
 * Attaches a GSAP ScrollTrigger animation to elements inside a container ref.
 * Returns the container ref — attach it to your section wrapper.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  targets,
  animation = "fadeUp",
  stagger = 0.1,
  duration = 0.7,
  delay = 0,
  start = "top 88%",
  y = 40,
}: ScrollRevealOptions) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const selectors = Array.isArray(targets) ? targets : [targets]
    const els = selectors.flatMap((s) =>
      Array.from(container.querySelectorAll<HTMLElement>(s))
    )
    if (!els.length) return

    const fromVars: gsap.TweenVars =
      animation === "fadeUp"     ? { opacity: 0, y }      :
      animation === "slideLeft"  ? { opacity: 0, x: -50 } :
      animation === "slideRight" ? { opacity: 0, x: 50 }  :
                                   { opacity: 0 }

    const tween = gsap.from(els, {
      ...fromVars,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none none",
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === container)
        .forEach((st) => st.kill())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return containerRef
}
