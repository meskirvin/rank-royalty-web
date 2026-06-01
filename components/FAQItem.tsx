"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItemProps { q: string; a: string }

export default function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      background: "rgba(8,6,2,0.85)", backdropFilter: "blur(20px)",
      border: `1px solid ${open ? "rgba(212,175,55,0.2)" : "rgba(212,175,55,0.07)"}`,
      transition: "border-color 0.2s",
    }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left gap-4" aria-expanded={open}>
        <span className="text-white font-medium text-sm">{q}</span>
        <ChevronDown size={15} style={{
          color: open ? "#D4AF37" : "rgba(232,224,208,0.3)",
          transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.3s ease, color 0.2s",
          flexShrink: 0,
        }} aria-hidden="true" />
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 400 : 0, opacity: open ? 1 : 0, transition: "max-height 0.35s ease, opacity 0.3s ease" }}>
        <p style={{ padding: "0 24px 24px", color: "rgba(232,224,208,0.45)", fontSize: 14, lineHeight: 1.85 }}>{a}</p>
      </div>
    </div>
  )
}
