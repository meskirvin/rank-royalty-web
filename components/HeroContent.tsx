"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Preloader from "./Preloader"

export default function HeroContent() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <div
        className="hero-section px-6"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.3s" }}
      >
        {/* Badge */}
        <div
          className="mb-10 flex items-center gap-2 px-4 py-2"
          style={{
            border: "1px solid rgba(0,255,135,0.15)",
            background: "rgba(0,255,135,0.04)",
            color: "rgba(0,255,135,0.7)",
            fontSize: 10,
            letterSpacing: "0.2em",
            fontWeight: 600,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00ff87" }} />
          / CINEMATIC SEO INTELLIGENCE
        </div>

        {/* Main headline — editorial style */}
        <div className="text-center" style={{ pointerEvents: "none" }}>
          <h1
            id="hero-heading"
            style={{
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            <span
              className="block text-white font-black"
              style={{ fontSize: "clamp(72px, 14vw, 160px)", letterSpacing: "-0.03em" }}
            >
              SEARCH
            </span>
            <span
              className="block font-black italic"
              style={{
                fontSize: "clamp(72px, 14vw, 160px)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #00ff87 0%, #00d4ff 50%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DOMINANCE
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="mt-10 text-center max-w-lg"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.8, letterSpacing: "0.01em" }}
        >
          Transcending traditional SEO. We deploy cinematic growth strategies through algorithmic precision and behavioral intelligence.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex items-center gap-5" style={{ pointerEvents: "auto" }}>
          <Link
            href="/contact"
            className="font-bold transition-all duration-200 hover:bg-white"
            style={{
              padding: "14px 36px",
              background: "#00ff87",
              color: "#060608",
              fontSize: 11,
              letterSpacing: "0.18em",
              fontWeight: 700,
            }}
          >
            SECURE TERRITORY
          </Link>
          <Link
            href="/services"
            className="font-semibold transition-all duration-200"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            EXPLORE METHOD ↓
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          <span style={{ fontSize: 9, letterSpacing: "0.25em" }}>SCROLL</span>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(0,255,135,0.4), transparent)" }} />
        </div>
      </div>
    </>
  )
}
