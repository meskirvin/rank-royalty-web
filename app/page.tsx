import type { Metadata } from "next"
import Link from "next/link"
import {
  Search, TrendingUp, BarChart2, Link2, MapPin, FileSearch,
  ArrowRight, ChevronRight, Star, CheckCircle2, Zap, Shield, Globe, Users,
} from "lucide-react"
import ParticleField from "@/components/ParticleField"
import SeoScanner from "@/components/SeoScanner"
import TiltCard from "@/components/TiltCard"
import AnimatedCounter from "@/components/AnimatedCounter"
import RankingChart from "@/components/RankingChart"
import { faqSchema, serviceSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Rank Royalty | SEO Agency That Actually Ranks",
  description:
    "We build organic growth engines through technical SEO, content strategy, and authoritative link building. Scan your site free — see exactly what's holding you back.",
  alternates: { canonical: "https://rankroyalty.com" },
}

const SERVICES = [
  {
    icon: FileSearch,
    title: "Technical SEO",
    desc: "We crawl your site like Google does. Speed, indexability, schema, Core Web Vitals — we fix the foundation first.",
    color: "#00ff87",
    tag: "Foundation",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "Dominate the local pack. Google Business Profile optimization, citation building, and geo-targeted content.",
    color: "#7c3aed",
    tag: "Local",
  },
  {
    icon: Search,
    title: "Keyword Research",
    desc: "We find the exact searches your buyers use. Long-tail, intent-based targeting that converts — not just traffic.",
    color: "#60a5fa",
    tag: "Discovery",
  },
  {
    icon: BarChart2,
    title: "Content Strategy",
    desc: "We map your content to the buyer's journey. Every piece is built to rank, convert, and compound over time.",
    color: "#f59e0b",
    tag: "Content",
  },
  {
    icon: Link2,
    title: "Link Building",
    desc: "White-hat outreach that earns placements on real sites. We build authority that Google respects.",
    color: "#f87171",
    tag: "Authority",
  },
  {
    icon: TrendingUp,
    title: "SEO Reporting",
    desc: "Live dashboards, monthly calls, clear before/after metrics. No hiding behind jargon.",
    color: "#34d399",
    tag: "Transparency",
  },
]

const PROCESS = [
  { step: "01", title: "Deep Audit", desc: "47-point technical and content audit. We know what's wrong before we start." },
  { step: "02", title: "90-Day Roadmap", desc: "Custom strategy mapped to your goals, market, and competition — nothing generic." },
  { step: "03", title: "Execute & Build", desc: "Technical fixes, content, and link building running in parallel from week one." },
  { step: "04", title: "Scale What Works", desc: "Monthly strategy calls. We double down on what's moving the needle." },
]

const FAQS = [
  {
    q: "How long does SEO take to show results?",
    a: "Most clients see measurable ranking improvement within 3–6 months. Significant organic traffic growth typically follows at the 6–12 month mark, with compounding gains continuing beyond. SEO is a long-term investment — unlike paid ads, the results don't stop when you do.",
  },
  {
    q: "What makes Rank Royalty different from other SEO agencies?",
    a: "We treat every client like a partner. Strategies are fully custom — no cookie-cutter packages. We build transparent, data-backed roadmaps and you see every move we make. Our team lives and breathes search, and our own website ranking is proof of that.",
  },
  {
    q: "Do you offer local SEO services?",
    a: "Yes — local SEO is one of our core specialties. We handle Google Business Profile optimization, local citation building, NAP consistency audits, and geo-targeted content to help you dominate your local market.",
  },
  {
    q: "How do you measure success?",
    a: "Keyword rankings, organic traffic, CTR, conversion rates from organic, and ultimately revenue impact. Every client gets a live dashboard and a monthly report with clear before/after comparisons.",
  },
  {
    q: "What does the engagement look like?",
    a: "We start with a deep audit, then build a 90-day roadmap. Month one is fixes and foundation. Month two is content and link building. Month three onwards is scaling what works. Weekly updates, monthly strategy calls.",
  },
]

const TICKER_ITEMS = [
  "⚡ Page 1 Rankings", "📈 Organic Traffic Growth", "🔗 Quality Backlinks",
  "🎯 Intent-Based Keywords", "🛠 Technical SEO Fixes", "📍 Local Pack Domination",
  "📊 Monthly Reporting", "🚀 Core Web Vitals", "🔍 Competitor Gap Analysis",
]

export default function HomePage() {
  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <ParticleField />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(0,255,135,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,135,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
          aria-hidden="true"
        />

        {/* Badge */}
        <div className="relative z-10 mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-brand-green/20 bg-brand-green/5 text-brand-green text-xs font-medium">
          <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
          Accepting new clients · Free SEO Audit Available
        </div>

        {/* Headline */}
        <h1 id="hero-heading" className="relative z-10 text-center text-5xl md:text-7xl font-bold tracking-tight leading-none max-w-4xl text-balance">
          <span className="text-white">Rank Higher.</span>
          <br />
          <span className="gradient-text">Grow Faster.</span>
          <br />
          <span className="text-white">Actually.</span>
        </h1>

        <p className="relative z-10 mt-8 text-center text-white/50 text-lg max-w-xl leading-relaxed text-balance">
          We build organic growth engines through technical SEO, content strategy, and link building that compounds. No fluff — just rankings that convert.
        </p>

        {/* Scanner */}
        <div className="relative z-10 mt-12 w-full max-w-2xl">
          <p className="text-center text-white/30 text-sm mb-4">← Enter your site URL for a free instant analysis →</p>
          <SeoScanner />
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 mt-16 flex flex-col items-center gap-2 text-white/20 text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-y border-white/5 py-4 bg-white/[0.02]" aria-hidden="true">
        <div className="flex animate-ticker whitespace-nowrap gap-12">
          {tickerContent.map((item, i) => (
            <span key={i} className="text-white/30 text-sm font-medium shrink-0">{item}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="stats-heading" className="sr-only">Our results by the numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 93,  suffix: "%",  label: "Client retention rate",      prefix: "" },
              { value: 4.8, suffix: "×",  label: "Avg organic traffic growth",  prefix: "" },
              { value: 47,  suffix: "-pt",label: "Point SEO audit process",     prefix: "" },
              { value: 6,   suffix: "mo", label: "Avg time to page 1",          prefix: "~" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {s.prefix}<AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-white/40 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section className="py-24 px-6" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-green text-sm font-mono mb-3">// what we do</p>
            <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-white">
              Everything you need to<br />
              <span className="gradient-text">own your market</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <TiltCard key={i} className="glass rounded-2xl p-6" glowColor={s.color}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg" style={{ background: s.color + "15", border: `1px solid ${s.color}25` }}>
                      <Icon size={20} style={{ color: s.color }} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded-md" style={{ background: s.color + "10", color: s.color + "99" }}>
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                </TiltCard>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-brand-green text-sm font-medium hover:gap-3 transition-all">
              See all services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── RESULTS / CHART ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5" aria-labelledby="results-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-brand-green text-sm font-mono mb-3">// real results</p>
            <h2 id="results-heading" className="text-4xl font-bold text-white mb-6">
              Watch rankings<br />
              <span className="gradient-text">climb in real time</span>
            </h2>
            <p className="text-white/40 leading-relaxed mb-8">
              This is a real client trajectory — a local service business that came to us sitting at position #48 for their primary keyword. Twelve months later: position #3, with traffic up 4.2×.
            </p>
            <div className="space-y-3">
              {[
                "Starting position: #48 → Current: #3",
                "Organic traffic: +420% in 12 months",
                "Leads from organic: went from 3/mo to 31/mo",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={15} className="text-brand-green shrink-0" />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white text-sm font-semibold">Keyword Ranking — Primary Term</p>
              <span className="text-xs font-mono text-brand-green px-2 py-1 rounded bg-brand-green/10">Live</span>
            </div>
            <RankingChart />
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-green text-sm font-mono mb-3">// how we work</p>
            <h2 id="process-heading" className="text-4xl md:text-5xl font-bold text-white">
              No mystery. No fluff.<br />
              <span className="gradient-text">Just a clear roadmap.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step, i) => (
              <div key={i} className="group relative">
                {/* Connector line */}
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-brand-green/30 to-transparent z-0" aria-hidden="true" />
                )}
                <div className="glass rounded-2xl p-6 group-hover:border-brand-green/20 transition-colors duration-300 relative z-10">
                  <div className="text-4xl font-bold gradient-text mb-4">{step.step}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-green text-sm font-mono mb-3">// what clients say</p>
            <h2 id="testimonials-heading" className="text-4xl font-bold text-white">
              Don&apos;t take our word for it
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                quote: "We were invisible on Google for two years. Within 6 months of working with Rank Royalty, we had three page-one rankings for our main services. The process was clear and the results were real.",
                name: "Sarah M.",
                role: "Owner, local HVAC company",
                stars: 5,
              },
              {
                quote: "I've worked with two other SEO agencies before. The difference is night and day. These guys actually explain what they're doing and why. The monthly reports are the clearest I've ever seen.",
                name: "James R.",
                role: "Marketing Director, e-commerce brand",
                stars: 5,
              },
            ].map((t, i) => (
              <TiltCard key={i} className="glass rounded-2xl p-7" glowColor="#7c3aed">
                <div className="flex gap-1 mb-4" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={14} className="text-brand-green fill-brand-green" aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/30 text-xs mt-0.5">{t.role}</p>
                  </footer>
                </blockquote>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-green text-sm font-mono mb-3">// common questions</p>
            <h2 id="faq-heading" className="text-4xl font-bold text-white">
              Straight answers to<br />
              <span className="gradient-text">straight questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-32 px-6" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative glass rounded-3xl p-12 border border-brand-green/10 overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 via-transparent to-brand-purple/5 pointer-events-none" aria-hidden="true" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <p className="relative text-brand-green text-sm font-mono mb-4">// ready to rank?</p>
            <h2 id="cta-heading" className="relative text-4xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s build your<br />
              <span className="gradient-text">organic growth engine</span>
            </h2>
            <p className="relative text-white/40 max-w-md mx-auto mb-10">
              Start with a free 47-point SEO audit. No pitch, no pressure — just a clear picture of where you stand and what to fix.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-green text-black font-bold rounded-xl hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2 group"
              >
                Get Free Audit
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-white/5 text-white rounded-xl hover:bg-white/10 border border-white/10 transition-colors duration-200"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ── FAQ accordion item (client component) ────────────────────────────────────
import FAQItem from "@/components/FAQItem"
