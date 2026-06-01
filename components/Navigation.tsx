"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/services", label: "DOMINION"    },
  { href: "/about",    label: "REGALIA"     },
  { href: "/contact",  label: "CORONATION"  },
]

function CrownIcon() {
  return (
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" aria-hidden="true">
      <path d="M1 18 L1 9 L6.5 13.5 L13 1 L19.5 13.5 L25 9 L25 18 Z"
        stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
        fill="rgba(212,175,55,0.07)" />
      <rect x="1" y="17" width="24" height="3.5" rx="1" fill="#D4AF37" opacity="0.85" />
      <circle cx="13" cy="1.5"  r="1.4" fill="#FFD060" />
      <circle cx="1"  cy="9"    r="1.1" fill="#D4AF37" opacity="0.65" />
      <circle cx="25" cy="9"    r="1.1" fill="#D4AF37" opacity="0.65" />
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      style={{
        background: scrolled ? "rgba(5,4,1,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.1)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Rank Royalty home">
          <CrownIcon />
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color: "#D4AF37", lineHeight: 1 }}>
              RANK ROYALTY
            </p>
            <p style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(212,175,55,0.4)", marginTop: 2 }}>
              EST · MMXXVI
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
                color: pathname === l.href ? "#D4AF37" : "rgba(232,224,208,0.35)",
                transition: "color 0.2s",
              }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:block font-bold transition-all duration-200"
          style={{
            fontSize: 10, letterSpacing: "0.22em",
            padding: "10px 22px",
            border: "1px solid rgba(212,175,55,0.45)",
            color: "#D4AF37",
            background: "rgba(212,175,55,0.04)",
          }}
        >
          REQUEST AUDIENCE
        </Link>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close" : "Open menu"}
          style={{ color: "rgba(212,175,55,0.6)" }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-8 py-6 flex flex-col gap-5"
          style={{ background: "rgba(5,4,1,0.97)", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
                color: pathname === l.href ? "#D4AF37" : "rgba(232,224,208,0.45)" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
              color: "#D4AF37", borderTop: "1px solid rgba(212,175,55,0.15)", paddingTop: 16, marginTop: 4 }}>
            REQUEST AUDIENCE
          </Link>
        </div>
      )}
    </header>
  )
}
