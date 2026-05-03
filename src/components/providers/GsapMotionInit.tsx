"use client"

/**
 * GsapMotionInit
 * ───────────────
 * Direct port of the design file's motion.js into a React client component.
 *
 * Runs once after the public-page layout mounts (placed in CommonLayOut).
 * Reads the same CSS class names used in each home-page component so the
 * animations match the reference design exactly:
 *
 *   Hero:         .hero-wrap  .hero  .eyebrow  .hero-title  .hero-sub
 *                 .hero-actions  .hero-trust  .hero-visual  .hero-img
 *                 .hero-card  .hero-card-tl  .hero-card-br
 *
 *   Reveal items: .stat  .cat-card  .prod  .feat  .step  .testi
 *                 .section-head  .news-card
 *
 *   Counters:     .stat-num
 */

import { useEffect } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function GsapMotionInit() {
  useEffect(() => {
    // Wait for React to paint the DOM, then for fonts to load
    function initMotion() {
      // ── Hero entrance ────────────────────────────────────────────
      const heroTitle = document.querySelector(".hero-title")
      if (heroTitle) {
        // Text elements stagger up
        gsap.from(
          ".hero .eyebrow, .hero-title, .hero-sub, .hero-actions, .hero-trust, .hero-dots",
          {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
          }
        )

        // Visual container: scale + fade in
        gsap.from(".hero-visual", {
          scale: 0.96,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        })

        // Floating cards pop in after visual
        gsap.from(".hero-card", {
          y: 18,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.6,
        })
      }

      // ── Hero image parallax (scroll-scrub) ───────────────────────
      gsap.to(".hero-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-wrap",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })

      // ── Floating card idle drift ─────────────────────────────────
      gsap.to(".hero-card-tl", {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
      gsap.to(".hero-card-br", {
        y: 8,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // ── Scroll-triggered reveal for all repeating items ──────────
      const revealSelectors = [
        ".stat",
        ".cat-card",
        ".prod",
        ".feat",
        ".step",
        ".testi",
        ".section-head",
        ".news-card",
      ]

      revealSelectors.forEach((sel) => {
        gsap.utils.toArray<HTMLElement>(sel).forEach((el, i) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 6) * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          })
        })
      })

      // ── Stat counter animation ───────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const text = el.textContent ?? ""
        const m = text.match(/^([\d.]+)([a-zA-Z+%]*)$/)
        if (!m) return
        const target = parseFloat(m[1])
        const suffix = m[2] || ""
        if (Number.isNaN(target)) return

        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate() {
            const n = obj.v
            const isInt = Number.isInteger(target) && !text.includes(".")
            el.textContent = (isInt ? Math.round(n) : n.toFixed(1)) + suffix
          },
        })
      })

      // Refresh after fonts load so measurements are accurate
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh())
      }
    }

    // React renders async — poll until the hero-title exists in the DOM
    function tryInit() {
      if (document.querySelector(".hero-title")) {
        initMotion()
      } else {
        setTimeout(tryInit, 60)
      }
    }

    tryInit()

    // Clean up all ScrollTrigger instances on unmount / route change
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
      gsap.killTweensOf("*")
    }
  }, [])

  return null
}
