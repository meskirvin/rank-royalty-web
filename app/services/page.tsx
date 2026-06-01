import type { Metadata } from "next"
import Link from "next/link"
import {
  FileSearch, MapPin, Search, BarChart2, Link2, TrendingUp,
  CheckCircle2, ArrowRight,
} from "lucide-react"
import TiltCard from "@/components/TiltCard"

export const metadata: Metadata = {
  title: "SEO Services",
  description:
    "Technical SEO, local SEO, link building, content strategy, and keyword research. Every service Rank Royalty offers is built around one goal: organic growth that compounds.",
  alternates: { canonical: "https://rankroyalty.com/services" },
}

const SERVICES = [
  {
    icon: FileSearch,
    title: "Technical SEO",
    color: "#00ff87",
    tagline: "Fix the foundation. Everything else follows.",
    desc: "Most sites have critical technical issues that stop Google from fully crawling and indexing their pages. We run a 47-point audit covering Core Web Vitals, crawl errors, mobile usability, schema markup, structured data, site architecture, and more.",
    deliverables: [
      "Full crawl audit and error resolution",
      "Core Web Vitals optimization",
      "Schema / structured data implementation",
      "XML sitemap and robots.txt optimization",
      "Redirect chain cleanup",
      "Canonical tag implementation",
    ],
  },
  {
    icon: MapPin,
    title: "Local SEO",
    color: "#7c3aed",
    tagline: "Own your city before you own the internet.",
    desc: "Local search is its own game. We optimize your Google Business Profile, build consistent citations across 50+ directories, and create geo-targeted content that puts you in the local pack for every relevant search in your area.",
    deliverables: [
      "Google Business Profile optimization",
      "NAP consistency audit and cleanup",
      "50+ directory citation building",
      "Local keyword targeting",
      "Review generation strategy",
      "Local schema markup",
    ],
  },
  {
    icon: Search,
    title: "Keyword Research",
    color: "#60a5fa",
    tagline: "Find the words your buyers actually use.",
    desc: "We map keyword intent across your entire funnel — awareness, consideration, and decision. Long-tail, local modifiers, competitor gaps, and semantic clusters. You get a prioritized keyword universe, not just a spreadsheet.",
    deliverables: [
      "Full keyword universe mapping",
      "Intent classification (informational / commercial / transactional)",
      "Competitor keyword gap analysis",
      "Long-tail and question keyword research",
      "Keyword-to-page mapping",
      "Rank tracking setup",
    ],
  },
  {
    icon: BarChart2,
    title: "Content Strategy",
    color: "#f59e0b",
    tagline: "Content that ranks, converts, and compounds.",
    desc: "We build content strategies that serve your buyers at every stage. Topic clusters, pillar pages, supporting content — everything mapped to search intent and designed to establish topical authority in your niche.",
    deliverables: [
      "Topic cluster architecture",
      "Content calendar (3-month)",
      "Pillar page strategy",
      "On-page optimization for existing content",
      "Content brief creation",
      "Internal linking strategy",
    ],
  },
  {
    icon: Link2,
    title: "Link Building",
    color: "#f87171",
    tagline: "Authority you earn. Not authority you buy.",
    desc: "Backlinks are still one of Google's strongest ranking signals — but quality beats quantity every time. We run white-hat outreach campaigns targeting real, relevant publications in your industry. No PBNs. No spam. No shortcuts.",
    deliverables: [
      "Backlink profile audit",
      "Toxic link disavow",
      "Competitor backlink gap analysis",
      "Outreach campaign management",
      "Digital PR and resource link building",
      "Monthly link acquisition reporting",
    ],
  },
  {
    icon: TrendingUp,
    title: "SEO Reporting",
    color: "#34d399",
    tagline: "You'll always know exactly where you stand.",
    desc: "Clear, honest reporting with no jargon. You get a live dashboard, monthly PDF reports with clear before/after comparisons, and a monthly strategy call to review what's working and what's next.",
    deliverables: [
      "Live ranking dashboard",
      "Monthly performance report",
      "Traffic and conversion attribution",
      "Competitor ranking monitoring",
      "Monthly strategy call",
      "Slack / email access to your strategist",
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center" aria-labelledby="services-hero-heading">
        <p className="text-brand-green text-sm font-mono mb-4">// our services</p>
        <h1 id="services-hero-heading" className="text-5xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
          Every tool you need to<br />
          <span className="gradient-text">dominate search</span>
        </h1>
        <p className="mt-6 text-white/40 max-w-xl mx-auto leading-relaxed">
          No cookie-cutter packages. Every engagement is built around your market, your competition, and your goals.
        </p>
      </section>

      {/* Services list */}
      <section className="pb-32 px-6" aria-labelledby="services-list-heading">
        <h2 id="services-list-heading" className="sr-only">Our SEO services</h2>
        <div className="max-w-7xl mx-auto space-y-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <TiltCard key={i} className="glass rounded-2xl p-8" glowColor={s.color}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-lg" style={{ background: s.color + "15", border: `1px solid ${s.color}25` }}>
                        <Icon size={22} style={{ color: s.color }} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl">{s.title}</h3>
                        <p className="text-sm" style={{ color: s.color + "99" }}>{s.tagline}</p>
                      </div>
                    </div>
                    <p className="text-white/50 leading-relaxed text-sm">{s.desc}</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs font-mono mb-3 uppercase tracking-widest">Deliverables</p>
                    <ul className="space-y-2.5" role="list">
                      {s.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} style={{ color: s.color }} className="mt-0.5 shrink-0" aria-hidden="true" />
                          <span className="text-white/60 text-sm">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32 px-6 text-center" aria-labelledby="services-cta-heading">
        <div className="max-w-2xl mx-auto glass rounded-2xl p-10 border border-brand-green/10">
          <h2 id="services-cta-heading" className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-white/40 mb-8">Let&apos;s talk about your market, your goals, and exactly what it&apos;ll take to get you to page one.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green text-black font-bold rounded-xl hover:bg-white transition-colors group">
            Get Free Audit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}
