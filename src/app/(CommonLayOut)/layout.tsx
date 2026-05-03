import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Chatbot from '@/components/home/Chatbot'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { GsapMotionInit } from '@/components/providers/GsapMotionInit'
import React from 'react'

export default function CommonLayOut({ children }: { children: React.ReactNode }) {
  return (
    /**
     * SmoothScrollProvider  — initialises Lenis + GSAP ticker sync
     * GsapMotionInit        — runs all ScrollTrigger animations after mount
     *                         (exact port of the design file's motion.js)
     */
    <SmoothScrollProvider>
      <GsapMotionInit />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </div>
    </SmoothScrollProvider>
  )
}
