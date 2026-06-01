"use client"

import { useEffect, useRef } from "react"

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef(0)

  useEffect(() => {
    const dot   = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    const onEnter = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.tagName === "A" || t.tagName === "BUTTON" || t.closest("a") || t.closest("button")) {
        ringEl.style.width  = "56px"
        ringEl.style.height = "56px"
        ringEl.style.borderColor = "rgba(212,175,55,0.9)"
        ringEl.style.background  = "rgba(212,175,55,0.06)"
        dot.style.opacity = "0"
      }
    }

    const onLeave = () => {
      ringEl.style.width  = "26px"
      ringEl.style.height = "26px"
      ringEl.style.borderColor = "rgba(212,175,55,0.4)"
      ringEl.style.background  = "transparent"
      dot.style.opacity = "1"
    }

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.11
      ring.current.y += (pos.current.y - ring.current.y) * 0.11
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover",  onEnter)
    document.addEventListener("mouseout",   onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover",  onEnter)
      document.removeEventListener("mouseout",   onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0, width: 5, height: 5,
        borderRadius: "50%", background: "#D4AF37", pointerEvents: "none",
        zIndex: 99999, transform: "translate(-50%,-50%)",
      }} />
      <div ref={ringRef} aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0, width: 26, height: 26,
        borderRadius: "50%", border: "1px solid rgba(212,175,55,0.4)",
        pointerEvents: "none", zIndex: 99998,
        transform: "translate(-50%,-50%)",
        transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease",
      }} />
    </>
  )
}
