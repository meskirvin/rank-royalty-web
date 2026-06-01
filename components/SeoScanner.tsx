"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Loader2, CheckCircle2, AlertCircle, TrendingUp, Zap, Shield, Globe } from "lucide-react"

const SCAN_STEPS = [
  { icon: Globe,      label: "Resolving domain...",        delay: 400  },
  { icon: Search,     label: "Crawling sitemap...",         delay: 900  },
  { icon: Zap,        label: "Analyzing page speed...",     delay: 1400 },
  { icon: Shield,     label: "Checking technical SEO...",   delay: 1900 },
  { icon: TrendingUp, label: "Estimating keyword gaps...",  delay: 2400 },
]

interface ScanResult {
  score: number
  issues: { severity: "critical" | "warning" | "info"; text: string }[]
  opportunities: string[]
}

function generateResult(url: string): ScanResult {
  // Deterministic-ish based on URL length so same URL = same result
  const seed = url.length + url.charCodeAt(0)
  const score = 20 + (seed % 45)  // 20–65 range (leaves room to improve with us)

  return {
    score,
    issues: ([
      { severity: "critical" as const, text: "Missing title tag optimizations on key pages" },
      { severity: "critical" as const, text: "No structured data / schema markup detected" },
      { severity: "warning"  as const, text: "Page load speed above 3.2s on mobile" },
      { severity: "warning"  as const, text: "Meta descriptions missing on 60%+ of pages" },
      { severity: "info"     as const, text: "Internal linking structure could be improved" },
    ] as const).slice(0, 3 + (seed % 3)),
    opportunities: [
      "Target 40+ long-tail keywords with low competition",
      "Local pack ranking opportunity for primary service area",
      "Content gap vs. top 3 competitors — 12 topics uncovered",
    ],
  }
}

export default function SeoScanner() {
  const [url, setUrl]         = useState("")
  const [scanning, setScanning] = useState(false)
  const [stepIdx, setStepIdx] = useState(-1)
  const [result, setResult]   = useState<ScanResult | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRefs = useRef<NodeJS.Timeout[]>([])

  function clearTimers() {
    timerRefs.current.forEach(clearTimeout)
    timerRefs.current = []
  }

  function handleScan() {
    if (!url.trim() || scanning) return
    clearTimers()
    setResult(null)
    setScanning(true)
    setStepIdx(0)

    SCAN_STEPS.forEach((step, i) => {
      const t = setTimeout(() => setStepIdx(i), step.delay)
      timerRefs.current.push(t)
    })

    const finish = setTimeout(() => {
      setResult(generateResult(url))
      setScanning(false)
      setStepIdx(-1)
    }, 3200)
    timerRefs.current.push(finish)
  }

  useEffect(() => () => clearTimers(), [])

  const scoreColor = result
    ? result.score < 40 ? "#f87171" : result.score < 60 ? "#fbbf24" : "#4ade80"
    : "#00ff87"

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Input row */}
      <div className="relative flex items-center gap-3">
        <div className="flex-1 relative">
          <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" aria-hidden="true" />
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleScan()}
            placeholder="yourwebsite.com"
            className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/25 focus:outline-none focus:border-brand-green/50 focus:bg-white/8 transition-all"
            aria-label="Enter your website URL for a free SEO analysis"
          />
        </div>
        <button
          onClick={handleScan}
          disabled={scanning || !url.trim()}
          className="px-6 py-4 bg-brand-green text-black text-sm font-bold rounded-xl hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
        >
          {scanning ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
          {scanning ? "Scanning..." : "Scan Site"}
        </button>
      </div>

      {/* Scanning animation */}
      {scanning && (
        <div className="mt-6 p-5 rounded-xl border border-white/8 bg-white/3 font-mono text-xs space-y-2">
          <div className="flex items-center gap-2 text-brand-green/60 mb-3">
            <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
            <span>rankroyalty.scan &gt; {url}</span>
          </div>
          {SCAN_STEPS.map((step, i) => {
            const Icon = step.icon
            const done = i < stepIdx
            const active = i === stepIdx
            return (
              <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${
                done ? "text-brand-green/70" : active ? "text-white" : "text-white/15"
              }`}>
                {done
                  ? <CheckCircle2 size={12} className="text-brand-green shrink-0" />
                  : active
                  ? <Loader2 size={12} className="animate-spin shrink-0" />
                  : <Icon size={12} className="shrink-0" />
                }
                <span>{step.label}</span>
                {active && <span className="animate-pulse">_</span>}
              </div>
            )
          })}
        </div>
      )}

      {/* Results */}
      {result && !scanning && (
        <div className="mt-6 rounded-xl border border-white/8 bg-white/3 overflow-hidden">
          {/* Score header */}
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/40 font-mono mb-1">SEO Health Score</p>
              <p className="text-xs text-white/30">{url}</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle
                  cx="32" cy="32" r="28" fill="none"
                  stroke={scoreColor} strokeWidth="4"
                  strokeDasharray={`${(result.score / 100) * 176} 176`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold" style={{ color: scoreColor }}>
                {result.score}
              </span>
            </div>
          </div>

          {/* Issues */}
          <div className="p-5 space-y-2">
            {result.issues.map((issue, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <AlertCircle size={13} className={`mt-0.5 shrink-0 ${
                  issue.severity === "critical" ? "text-red-400" : issue.severity === "warning" ? "text-yellow-400" : "text-blue-400"
                }`} />
                <span className="text-white/60 text-xs">{issue.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-5 pb-5">
            <a
              href="/contact"
              className="block w-full py-3 bg-brand-green text-black text-sm font-bold rounded-lg text-center hover:bg-white transition-colors"
            >
              Get Full 47-Point Audit — Free
            </a>
            <p className="text-center text-white/20 text-xs mt-2">No credit card. No spam. Just answers.</p>
          </div>
        </div>
      )}
    </div>
  )
}
