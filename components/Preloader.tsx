"use client"

import { useEffect, useRef, useState } from "react"

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 16 + 5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          const wrap = wrapRef.current
          if (wrap) {
            wrap.style.transition = "transform 1s cubic-bezier(0.76,0,0.24,1)"
            wrap.style.transform  = "translateY(-100%)"
            setTimeout(onComplete, 1050)
          }
        }, 400)
      }
      setProgress(Math.min(p, 100))
    }, 90)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div ref={wrapRef} style={{
      position: "fixed", inset: 0, zIndex: 100000,
      background: "#050505",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 36,
    }}>
      {/* Crown icon */}
      <svg width="40" height="34" viewBox="0 0 26 22" fill="none">
        <path d="M1 18 L1 9 L6.5 13.5 L13 1 L19.5 13.5 L25 9 L25 18 Z"
          stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(212,175,55,0.06)" />
        <rect x="1" y="17" width="24" height="3.5" rx="1" fill="#D4AF37" opacity="0.85" />
      </svg>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.25em", color: "#D4AF37" }}>RANK ROYALTY</p>
        <p style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(212,175,55,0.35)", marginTop: 4 }}>EST · MMXXVI</p>
      </div>

      {/* Progress bar */}
      <div style={{ width: 180, height: 1, background: "rgba(212,175,55,0.1)", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: "linear-gradient(90deg, #8B6914, #D4AF37, #FFD060)",
          transition: "width 0.1s ease",
        }} />
      </div>

      <span style={{ color: "rgba(212,175,55,0.3)", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em" }}>
        {Math.round(progress).toString().padStart(3, "0")}
      </span>
    </div>
  )
}
