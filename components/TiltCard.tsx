"use client"

import { useRef } from "react"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  style?: React.CSSProperties
}

export default function TiltCard({ children, className = "", glowColor = "#00ff87", style }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width  / 2
    const cy = rect.height / 2
    const rotateX =  ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) *  8
    card.style.transform  = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    card.style.boxShadow  = `0 20px 60px ${glowColor}20`
    // Move inner glow
    const glow = card.querySelector<HTMLElement>(".card-glow")
    if (glow) {
      glow.style.opacity = "1"
      glow.style.left = `${x}px`
      glow.style.top  = `${y}px`
    }
  }

  function onMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)"
    card.style.boxShadow = "none"
    const glow = card.querySelector<HTMLElement>(".card-glow")
    if (glow) glow.style.opacity = "0"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden transition-transform duration-200 ease-out ${className}`}
      style={{ willChange: "transform", ...style }}
    >
      {/* Spotlight glow */}
      <div
        className="card-glow absolute pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          width: 200, height: 200,
          background: `radial-gradient(circle, ${glowColor}15 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
        }}
      />
      {children}
    </div>
  )
}
