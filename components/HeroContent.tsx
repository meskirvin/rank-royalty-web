"use client"

import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Preloader from "./Preloader"

const HeroCanvas = dynamic(() => import("./three/HeroCanvas"), { ssr: false })

export default function HeroContent() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* WebGL canvas — fixed behind */}
      <HeroCanvas />

      <div
        className="hero-section px-6"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease 0.4s" }}
      >
        {/* Main headline */}
        <div className="text-center" style={{ pointerEvents: "none" }}>
          {/* RANK — massive white sans */}
          <h1
            id="hero-heading"
            className="text-white font-black block"
            style={{
              fontSize: "clamp(80px, 16vw, 180px)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            RANK
          </h1>

          {/* Royalty — gold serif italic */}
          <div
            className="serif italic block"
            style={{
              fontSize: "clamp(64px, 13vw, 148px)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #FFD060 0%, #D4AF37 45%, #8B6914 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
            }}
          >
            Royalty
          </div>
        </div>

        {/* Subtitle */}
        <p
          className="mt-10 text-center text-balance max-w-lg"
          style={{ color: "rgba(232,224,208,0.45)", fontSize: 15, lineHeight: 1.85, letterSpacing: "0.01em" }}
        >
          We don&apos;t chase rankings. We crown them. The world&apos;s most ambitious brands enthrone their search authority through our cinematic, algorithmically engineered ascent.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex items-center gap-6" style={{ pointerEvents: "auto" }}>
          <Link
            href="/contact"
            className="font-bold transition-all duration-200 hover:bg-white hover:text-black"
            style={{
              padding: "14px 36px",
              border: "1px solid #D4AF37",
              background: "rgba(212,175,55,0.08)",
              color: "#D4AF37",
              fontSize: 10,
              letterSpacing: "0.22em",
            }}
          >
            CLAIM YOUR THRONE
          </Link>
          <Link
            href="/services"
            className="transition-all duration-200"
            style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(232,224,208,0.35)" }}
          >
            SURVEY THE DOMINION →
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ color: "rgba(212,175,55,0.25)" }}>
          <span style={{ fontSize: 8, letterSpacing: "0.3em" }}>↓ DESCEND</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(212,175,55,0.4), transparent)" }} />
        </div>
      </div>
    </>
  )
}
