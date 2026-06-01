"use client"

import { useEffect, useRef, useState } from "react"

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone]         = useState(false)
  const barRef  = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate asset loading progress
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setDone(true)
          // Slide out
          const wrap = wrapRef.current
          if (wrap) {
            wrap.style.transition = "transform 0.9s cubic-bezier(0.76,0,0.24,1)"
            wrap.style.transform  = "translateY(-100%)"
            setTimeout(onComplete, 950)
          }
        }, 300)
      }
      setProgress(Math.min(p, 100))
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed", inset: 0, zIndex: 100000,
        background: "#060608",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 32,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          border: "1px solid rgba(0,255,135,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,255,135,0.05)",
        }}>
          <span style={{ color: "#00ff87", fontSize: 24, fontWeight: 800 }}>R</span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Rank<span style={{ color: "#00ff87" }}>Royalty</span>
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ width: 200, height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1, overflow: "hidden" }}>
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #00ff87, #7c3aed)",
            borderRadius: 1,
            transition: "width 0.1s ease",
          }}
        />
      </div>

      {/* Counter */}
      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, fontFamily: "monospace" }}>
        {Math.round(progress).toString().padStart(3, "0")}
      </span>
    </div>
  )
}
