"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItemProps { q: string; a: string }

export default function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`glass rounded-xl border transition-colors duration-200 ${open ? "border-brand-green/20" : "border-white/5"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="text-white font-medium text-sm">{q}</span>
        <ChevronDown
          size={16}
          className={`text-white/40 shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-brand-green" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-5 pb-5 text-white/50 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  )
}
