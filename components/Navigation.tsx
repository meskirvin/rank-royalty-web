"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/services", label: "SERVICES" },
  { href: "/about",    label: "ABOUT" },
  { href: "/contact",  label: "RESULTS" },
]

function CrownLogo() {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" aria-hidden="true">
      <path
        d="M2 20 L2 10 L7.5 14.5 L14 2 L20.5 14.5 L26 10 L26 20 Z"
        stroke="#00ff87"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="rgba(0,255,135,0.08)"
      />
      <rect x="2" y="19" width="24" height="3" rx="1.5" fill="#00ff87" opacity="0.9" />
      <circle cx="14" cy="2.5"  r="1.5" fill="#00ff87" />
      <circle cx="2"  cy="10"   r="1.2" fill="#00ff87" opacity="0.7" />
      <circle cx="26" cy="10"   r="1.2" fill="#00ff87" opacity="0.7" />
    </svg>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
      style={{
        background: scrolled ? "rgba(6,6,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Rank Royalty home">
          <CrownLogo />
          <div>
            <span
              className="font-black tracking-widest text-white block leading-none"
              style={{ fontSize: 13, letterSpacing: "0.18em" }}
            >
              RANK<span style={{ color: "#00ff87" }}>ROYALTY</span>
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition-colors duration-200"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: pathname === l.href ? "#00ff87" : "rgba(255,255,255,0.45)",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="transition-all duration-200 font-bold"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              padding: "10px 24px",
              border: "1px solid rgba(0,255,135,0.5)",
              color: "#00ff87",
              background: "rgba(0,255,135,0.04)",
            }}
          >
            INITIALIZE
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-8 py-6 flex flex-col gap-5" style={{ background: "rgba(6,6,8,0.95)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: pathname === l.href ? "#00ff87" : "rgba(255,255,255,0.5)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", padding: "10px 0", color: "#00ff87", borderTop: "1px solid rgba(0,255,135,0.2)", marginTop: 4 }}
          >
            INITIALIZE
          </Link>
        </div>
      )}
    </header>
  )
}
