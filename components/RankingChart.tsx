"use client"

import { useEffect, useRef, useState } from "react"

const DATA_BEFORE = [48, 45, 43, 47, 42, 40, 38, 36, 35, 33, 30, 28]
const DATA_AFTER  = [28, 24, 21, 18, 15, 12, 10, 8,  6,  5,  4,  3 ]
const LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export default function RankingChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(false)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true) },
      { threshold: 0.4 }
    )
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!revealed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = canvas.width  = canvas.offsetWidth
    const H = canvas.height = 200
    const pad = { top: 20, right: 20, bottom: 30, left: 30 }
    const iW = W - pad.left - pad.right
    const iH = H - pad.top  - pad.bottom

    const maxVal = 55
    const minVal = 0

    function toX(i: number) { return pad.left + (i / (DATA_BEFORE.length - 1)) * iW }
    function toY(v: number) { return pad.top + ((v - minVal) / (maxVal - minVal)) * iH }

    let progress = 0
    const start = performance.now()
    const dur = 1600

    const draw = (now: number) => {
      progress = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      ctx.clearRect(0, 0, W, H)

      // Grid lines
      for (let i = 0; i <= 4; i++) {
        const v = minVal + (maxVal - minVal) * (i / 4)
        const y = toY(v)
        ctx.beginPath()
        ctx.moveTo(pad.left, y)
        ctx.lineTo(W - pad.right, y)
        ctx.strokeStyle = "rgba(255,255,255,0.04)"
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = "rgba(255,255,255,0.2)"
        ctx.font = "10px sans-serif"
        ctx.fillText(`#${Math.round(v)}`, 0, y + 4)
      }

      // Draw a line up to current progress
      const pts = Math.floor(eased * (DATA_BEFORE.length - 1)) + 1

      const drawLine = (data: number[], color: string) => {
        ctx.beginPath()
        for (let i = 0; i < pts; i++) {
          const x = toX(i)
          const y = toY(data[i])
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = color
        ctx.lineWidth = 2.5
        ctx.lineJoin = "round"
        ctx.stroke()

        // Dot at current end
        const lastI = pts - 1
        ctx.beginPath()
        ctx.arc(toX(lastI), toY(data[lastI]), 4, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      drawLine(DATA_BEFORE, "rgba(248,113,113,0.7)")
      drawLine(DATA_AFTER,  "#00ff87")

      // Labels
      ctx.fillStyle = "rgba(255,255,255,0.25)"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      LABELS.forEach((l, i) => ctx.fillText(l, toX(i), H - 5))

      if (progress < 1) animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [revealed])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full" style={{ height: 200 }} aria-label="Keyword ranking improvement chart" />
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-white/40">
        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-red-400/70 rounded inline-block" />Before Rank Royalty</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-brand-green rounded inline-block" />After Rank Royalty</span>
      </div>
    </div>
  )
}
