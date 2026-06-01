"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import SeoScanner from "./SeoScanner"
import Preloader from "./Preloader"

export default function HeroContent() {
  const [loaded, setLoaded] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <div
        className="hero-section px-6"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}
      >
        {/* Badge */}
        <div
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
          style={{ border: "1px solid rgba(0,255,135,0.2)", background: "rgba(0,255,135,0.05)", color: "#00ff87" }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00ff87" }} />
          Accepting new clients · Free SEO Audit Available
        </div>

        {/* Headline */}
        <h1
          ref={headingRef}
          className="text-center font-bold tracking-tight leading-none text-balance"
          style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          id="hero-heading"
        >
          <span className="text-white block">Rank Higher.</span>
          <span className="gradient-text block">Grow Faster.</span>
          <span className="text-white block">Actually.</span>
        </h1>

        <p
          className="mt-8 text-center text-balance max-w-xl"
          style={{ color: "rgba(255,255,255,0.45)", fontSize: 18, lineHeight: 1.7 }}
        >
          We build organic growth engines through technical SEO, content strategy, and link building that compounds over time.
        </p>

        {/* Scanner */}
        <div className="mt-12 w-full max-w-2xl">
          <p className="text-center text-xs mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>
            ← Enter your URL for a free instant SEO analysis →
          </p>
          <SeoScanner />
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(255,255,255,0.18)", fontSize: 11 }}
        >
          <span style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          <div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, rgba(0,255,135,0.3), transparent)" }}
          />
        </div>
      </div>
    </>
  )
}
