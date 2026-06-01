"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5 bg-transparent"
      }`}
      aria-label="Site header"
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Rank Royalty home">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-brand-green rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-1 border border-brand-green/60 rounded-md" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-brand-green font-bold text-sm">R</span>
            </div>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            Rank<span className="text-brand-green">Royalty</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-brand-green ${
                  pathname === l.href ? "text-brand-green" : "text-white/60"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-brand-green text-black text-sm font-bold rounded-lg hover:bg-white transition-colors duration-200"
          >
            Get Free Audit
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${pathname === l.href ? "text-brand-green" : "text-white/70"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 px-5 py-2.5 bg-brand-green text-black text-sm font-bold rounded-lg text-center">
            Get Free Audit
          </Link>
        </div>
      )}
    </header>
  )
}
