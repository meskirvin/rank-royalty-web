import Link from "next/link"

const services = ["Technical SEO", "Local SEO", "Content Strategy", "Link Building", "SEO Audits", "Keyword Research"]
const company  = ["About", "Services", "Contact"]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-32" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="font-bold text-xl text-white">
                Rank<span className="text-brand-green">Royalty</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              We build organic growth engines that compound over time. No shortcuts. No vanity metrics. Just rankings that convert.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              <span className="text-white/40 text-xs">Actively taking new clients</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2.5" role="list">
              {services.map(s => (
                <li key={s}>
                  <Link href="/services" className="text-white/40 text-sm hover:text-brand-green transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5" role="list">
              {company.map(c => (
                <li key={c}>
                  <Link href={`/${c.toLowerCase()}`} className="text-white/40 text-sm hover:text-brand-green transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="mailto:hello@rankroyalty.com"
                className="text-white/40 text-sm hover:text-brand-green transition-colors"
              >
                hello@rankroyalty.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Rank Royalty. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/25 text-xs hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="text-white/25 text-xs hover:text-white/50 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
