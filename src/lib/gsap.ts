/**
 * Central GSAP registration — import from here everywhere so plugins are
 * registered exactly once before any component uses them.
 */
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
