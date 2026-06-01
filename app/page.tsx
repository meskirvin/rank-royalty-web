import type { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  FileSearch, MapPin, Search, BarChart2, Link2, TrendingUp,
  ArrowRight, ChevronRight, Star, CheckCircle2, Globe,
} from "lucide-react"
import TiltCard from "@/components/TiltCard"
import AnimatedCounter from "@/components/AnimatedCounter"
import RankingChart from "@/components/RankingChart"
import FAQItem from "@/components/FAQItem"
import HeroContent from "@/components/HeroContent"
import { faqSchema, serviceSchema } from "@/lib/structured-data"

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false })

export function generateMetadata(): Metadata {
  return {
    title: "Rank Royalty | SEO Agency That Actually Ranks",
    description: "We build organic growth engines through technical SEO, content strategy, and authoritative link building. Scan your site free — see exactly what's holding you back.",
    alternates: { canonical: "https://rankroyalty.com" },
  }
}

const SERVICES = [
  { icon: FileSearch, title: "Technical SEO",    color: "#00ff87", tag: "Foundation", desc: "We crawl your site like Google does. Speed, indexability, schema, Core Web Vitals — we fix the foundation first." },
  { icon: MapPin,     title: "Local SEO",         color: "#7c3aed", tag: "Local",      desc: "Dominate the local pack. Google Business Profile optimization, citation building, and geo-targeted content." },
  { icon: Search,     title: "Keyword Research",  color: "#60a5fa", tag: "Discovery",  desc: "We find the exact searches your buyers use. Long-tail, intent-based targeting that converts — not just traffic." },
  { icon: BarChart2,  title: "Content Strategy",  color: "#f59e0b", tag: "Content",    desc: "We map your content to the buyer's journey. Every piece is built to rank, convert, and compound over time." },
  { icon: Link2,      title: "Link Building",     color: "#f87171", tag: "Authority",  desc: "White-hat outreach that earns placements on real sites. We build authority that Google respects." },
  { icon: TrendingUp, title: "SEO Reporting",     color: "#34d399", tag: "Visibility", desc: "Live dashboards, monthly calls, clear before/after metrics. No hiding behind jargon." },
]

const PROCESS = [
  { step: "01", title: "Deep Audit",     desc: "47-point technical and content audit. We know what's wrong before we start." },
  { step: "02", title: "90-Day Roadmap", desc: "Custom strategy mapped to your goals, market, and competition — nothing generic." },
  { step: "03", title: "Execute",        desc: "Technical fixes, content, and link building running in parallel from week one." },
  { step: "04", title: "Scale",          desc: "Monthly strategy calls. We double down on what's moving the needle." },
]

const FAQS = [
  { q: "How long does SEO take to show results?",           a: "Most clients see measurable ranking improvement within 3–6 months. Significant organic traffic growth typically follows at the 6–12 month mark, with compounding gains continuing beyond. SEO is a long-term investment — unlike paid ads, the results don't stop when you do." },
  { q: "What makes Rank Royalty different?",                a: "We treat every client like a partner. Strategies are fully custom — no cookie-cutter packages. We build transparent, data-backed roadmaps and you see every move we make. Our team lives and breathes search, and our own website ranking proves it." },
  { q: "Do you offer local SEO services?",                  a: "Yes — local SEO is one of our core specialties. We handle Google Business Profile optimization, local citation building, NAP consistency audits, and geo-targeted content to help you dominate your local market." },
  { q: "How do you measure success?",                       a: "Keyword rankings, organic traffic, CTR, conversion rates from organic, and revenue impact. Every client gets a live dashboard and a monthly report with clear before/after comparisons." },
  { q: "What does the engagement look like?",               a: "We start with a deep audit, then build a 90-day roadmap. Month one is fixes and foundation. Month two is content and link building. Month three onwards is scaling what works. Weekly updates, monthly strategy calls." },
]

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── SPATIAL JOURNEY WRAPPER ─────────────────────────────────── */}
      <HeroCanvas>
        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section className="relative" style={{ height: "100vh" }} aria-labelledby="hero-heading">
          {/* HTML overlay */}
          <HeroContent />
        </section>

      {/* ── TICKER ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-y py-4" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)" }} aria-hidden="true">
        <div className="flex animate-ticker whitespace-nowrap gap-16">
          {[...Array(2)].flatMap(() => [
            "⚡ Page 1 Rankings", "📈 Organic Traffic Growth", "🔗 Quality Backlinks",
            "🎯 Intent-Based Keywords", "🛠 Technical SEO Fixes", "📍 Local Pack Domination",
            "📊 Live Reporting", "🚀 Core Web Vitals", "🔍 Competitor Gap Analysis",
          ]).map((item, i) => (
            <span key={i} className="text-sm font-medium shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="stats-heading" className="sr-only">Our results by the numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 93,  suffix: "%",   label: "Client retention rate"       },
              { value: 4,   suffix: ".8×", label: "Avg organic traffic growth"  },
              { value: 47,  suffix: "",    label: "Point SEO audit checklist"   },
              { value: 6,   suffix: "mo",  label: "Avg time to page 1"          },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-3">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section className="py-28 px-6" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-mono mb-3" style={{ color: "#00ff87" }}>// what we do</p>
            <h2 id="services-heading" className="text-5xl md:text-6xl font-bold text-white">
              Everything you need<br />
              <span className="gradient-text">to own your market</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <TiltCard key={i} className="rounded-2xl p-6" glowColor={s.color} style={{ background: "rgba(10,10,18,0.8)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-2.5 rounded-xl" style={{ background: s.color + "15", border: `1px solid ${s.color}25` }}>
                      <Icon size={20} style={{ color: s.color }} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full" style={{ background: s.color + "10", color: s.color + "80", border: `1px solid ${s.color}20` }}>{s.tag}</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
                </TiltCard>
              )
            })}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 font-medium text-sm transition-all" style={{ color: "#00ff87" }}>
              Explore all services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── RESULTS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6" style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }} aria-labelledby="results-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-sm font-mono mb-3" style={{ color: "#00ff87" }}>// real results</p>
            <h2 id="results-heading" className="text-5xl font-bold text-white mb-8">
              Rankings that<br />
              <span className="gradient-text">actually move</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 32 }}>
              A local service business, position #48 on their primary keyword. Twelve months later: position #3, organic traffic up 4.2×, leads from search went from 3 to 31 per month.
            </p>
            <div className="space-y-3">
              {["#48 → #3 on primary keyword", "420% organic traffic growth", "3 → 31 leads/month from search"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={15} style={{ color: "#00ff87", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(10,10,18,0.8)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 28, backdropFilter: "blur(20px)" }}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-white text-sm font-semibold">Keyword Position — Primary Term</p>
              <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(0,255,135,0.1)", color: "#00ff87" }}>12-Month View</span>
            </div>
            <RankingChart />
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-mono mb-3" style={{ color: "#00ff87" }}>// how we work</p>
            <h2 id="process-heading" className="text-5xl md:text-6xl font-bold text-white">
              No mystery.<br />
              <span className="gradient-text">Just a clear roadmap.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((step, i) => (
              <div key={i} className="group relative">
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-9 left-full w-full h-px z-0" style={{ background: "linear-gradient(90deg, rgba(0,255,135,0.25), transparent)" }} aria-hidden="true" />
                )}
                <div className="relative z-10 rounded-2xl p-7 transition-all duration-300" style={{ background: "rgba(10,10,18,0.8)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
                  <div className="text-5xl font-black gradient-text mb-5">{step.step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-28 px-6" style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }} aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-mono mb-3" style={{ color: "#00ff87" }}>// what clients say</p>
            <h2 id="testimonials-heading" className="text-5xl font-bold text-white">Don&apos;t take our word for it</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { quote: "We were invisible on Google for two years. Within 6 months of working with Rank Royalty, we had three page-one rankings for our main services. The process was clear and the results were real.", name: "Sarah M.", role: "Owner, HVAC company" },
              { quote: "I've worked with two other SEO agencies before. The difference is night and day. These guys actually explain what they're doing and why. The monthly reports are the clearest I've ever seen.", name: "James R.", role: "Marketing Director, e-commerce brand" },
            ].map((t, i) => (
              <TiltCard key={i} className="rounded-2xl p-8" glowColor="#7c3aed" style={{ background: "rgba(10,10,18,0.8)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => <Star key={s} size={14} style={{ color: "#00ff87", fill: "#00ff87" }} aria-hidden="true" />)}
                </div>
                <blockquote>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 3 }}>{t.role}</p>
                  </footer>
                </blockquote>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-28 px-6" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-mono mb-3" style={{ color: "#00ff87" }}>// common questions</p>
            <h2 id="faq-heading" className="text-5xl font-bold text-white">
              Straight answers<br />
              <span className="gradient-text">to straight questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-36 px-6" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl p-16 overflow-hidden" style={{ background: "rgba(10,10,18,0.9)", border: "1px solid rgba(0,255,135,0.12)", backdropFilter: "blur(30px)" }}>
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(0,255,135,0.07)" }} aria-hidden="true" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(124,58,237,0.07)" }} aria-hidden="true" />
            <p className="relative text-sm font-mono mb-5" style={{ color: "#00ff87" }}>// ready to rank?</p>
            <h2 id="cta-heading" className="relative text-5xl md:text-6xl font-bold text-white mb-8">
              Let&apos;s build your<br />
              <span className="gradient-text">organic growth engine</span>
            </h2>
            <p className="relative max-w-md mx-auto mb-12" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
              Start with a free 47-point SEO audit. No pitch, no pressure — just a clear picture of where you stand.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-10 py-5 font-bold rounded-2xl flex items-center justify-center gap-2 group transition-colors" style={{ background: "#00ff87", color: "#060608", fontSize: 15 }}>
                Get Free Audit
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link href="/services" className="px-10 py-5 rounded-2xl border transition-colors" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 15 }}>
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
      </HeroCanvas>
    </>
  )
}
