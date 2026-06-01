import type { Metadata } from "next"
import Link from "next/link"
import {
  FileSearch, MapPin, Search, BarChart2, Link2, TrendingUp,
  ArrowRight, ChevronRight, Star, CheckCircle2,
} from "lucide-react"
import TiltCard from "@/components/TiltCard"
import AnimatedCounter from "@/components/AnimatedCounter"
import RankingChart from "@/components/RankingChart"
import FAQItem from "@/components/FAQItem"
import HeroContent from "@/components/HeroContent"
import { faqSchema, serviceSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Rank Royalty | We Don't Chase Rankings. We Crown Them.",
  description: "Elite SEO agency. Technical mastery, cinematic content strategy, and authoritative link building that enthrones brands in search.",
  alternates: { canonical: "https://rankroyalty.com" },
}

const SERVICES = [
  { icon: FileSearch, title: "Technical SEO",    color: "#D4AF37", tag: "Foundation", desc: "We crawl your site like Google does. Speed, indexability, schema, Core Web Vitals — the crown only stands on a solid foundation." },
  { icon: MapPin,     title: "Local SEO",         color: "#FFD060", tag: "Territory",  desc: "Dominate your local domain. Google Business Profile, citation building, and geo-targeted content that rules the local pack." },
  { icon: Search,     title: "Keyword Research",  color: "#C0A020", tag: "Intelligence",desc: "We map the exact queries your buyers use. Intent-based targeting that converts — not just traffic numbers." },
  { icon: BarChart2,  title: "Content Strategy",  color: "#D4AF37", tag: "Authority",  desc: "Every piece of content is engineered to rank, convert, and compound over time. No filler. Only assets." },
  { icon: Link2,      title: "Link Building",     color: "#FFD060", tag: "Power",      desc: "White-hat outreach that earns real placements on authoritative sites. We build domain authority that Google rewards." },
  { icon: TrendingUp, title: "SEO Reporting",     color: "#C0A020", tag: "Visibility", desc: "Live dashboards. Monthly crown reports. You always know exactly where you rank and where you're heading." },
]

const PROCESS = [
  { step: "01", title: "The Audit",     desc: "47-point technical and content audit. We map every weakness before we plan." },
  { step: "02", title: "The Blueprint", desc: "Custom 90-day strategy mapped to your market, your competition, your goals." },
  { step: "03", title: "The Ascent",    desc: "Technical fixes, content, and link building executing in parallel from week one." },
  { step: "04", title: "The Reign",     desc: "Monthly strategy calls. We compound what's working and conquer new territory." },
]

const FAQS = [
  { q: "How long does SEO take to show results?", a: "Most clients see measurable ranking improvement within 3–6 months. Significant organic traffic growth typically follows at the 6–12 month mark, with compounding gains continuing beyond. Unlike paid ads, the results don't stop when you do." },
  { q: "What makes Rank Royalty different?", a: "We treat every client like a partner, not a retainer number. Strategies are fully custom — no cookie-cutter packages. We build transparent, data-backed roadmaps and you see every move we make." },
  { q: "Do you offer local SEO?", a: "Yes — local SEO is one of our core specialties. Google Business Profile optimization, citation building, NAP consistency audits, and geo-targeted content to dominate your local market." },
  { q: "How do you measure success?", a: "Keyword rankings, organic traffic, CTR, conversion rates from organic, and revenue impact. Every client gets a live dashboard and a monthly report with clear before/after comparisons." },
  { q: "What does the engagement look like?", a: "Deep audit first, then a 90-day roadmap. Month one: fixes and foundation. Month two: content and link building. Month three onwards: scaling what works. Weekly updates, monthly strategy calls." },
]

const G = "#D4AF37"

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative" style={{ height: "100vh" }} aria-labelledby="hero-heading">
        <HeroContent />
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-y py-4" aria-hidden="true"
        style={{ borderColor: "rgba(212,175,55,0.08)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
        <div className="flex animate-ticker whitespace-nowrap gap-16">
          {[...Array(2)].flatMap(() => [
            "TOP 10 GROWTH AGENCIES", "SEARCH ENGINE LAND · OUTSTANDING",
            "CLUTCH · GLOBAL LEADER", "WEBBY AWARD NOMINATED",
            "PAGE 1 RANKINGS", "ORGANIC AUTHORITY", "CINEMATIC SEO",
          ]).map((item, i) => (
            <span key={i} className="shrink-0" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", color: "rgba(212,175,55,0.35)" }}>
              {item} <span style={{ margin: "0 8px", color: "rgba(212,175,55,0.2)" }}>+</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────────── */}
      <section className="py-32 px-6" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="stats-heading" className="sr-only">Results by the numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: 93,  suffix: "%",   label: "Client retention rate"    },
              { value: 4,   suffix: ".8×", label: "Avg organic growth"       },
              { value: 47,  suffix: "",    label: "Point audit process"       },
              { value: 6,   suffix: "mo",  label: "Avg time to page 1"        },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-black mb-3 gradient-text" style={{ fontSize: "clamp(40px,6vw,64px)", letterSpacing: "-0.03em" }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(232,224,208,0.3)" }}>{s.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }} aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)", marginBottom: 16 }}>THE DOMINION</p>
            <h2 id="services-heading" className="text-white font-black" style={{ fontSize: "clamp(36px,5vw,60px)", letterSpacing: "-0.02em" }}>
              Everything required to<br />
              <span className="gradient-text">reign in search</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <TiltCard key={i} className="p-7" glowColor={s.color} style={{
                  background: "rgba(8,6,2,0.85)", border: "1px solid rgba(212,175,55,0.1)", backdropFilter: "blur(20px)"
                }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-2.5" style={{ background: s.color + "12", border: `1px solid ${s.color}20` }}>
                      <Icon size={18} style={{ color: s.color }} />
                    </div>
                    <span style={{ fontSize: 8, letterSpacing: "0.2em", color: s.color + "70", padding: "4px 10px", border: `1px solid ${s.color}18`, background: s.color + "06" }}>{s.tag}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                  <p style={{ color: "rgba(232,224,208,0.38)", fontSize: 14, lineHeight: 1.75 }}>{s.desc}</p>
                </TiltCard>
              )
            })}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 transition-all" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#D4AF37" }}>
              EXPLORE THE FULL DOMINION <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── RESULTS ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ borderTop: "1px solid rgba(212,175,55,0.06)", background: "rgba(0,0,0,0.3)" }} aria-labelledby="results-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)", marginBottom: 16 }}>THE ASCENT</p>
            <h2 id="results-heading" className="text-white font-black mb-8" style={{ fontSize: "clamp(32px,4.5vw,52px)", letterSpacing: "-0.02em" }}>
              Rankings that<br /><span className="gradient-text">actually move</span>
            </h2>
            <p style={{ color: "rgba(232,224,208,0.42)", lineHeight: 1.85, marginBottom: 32, fontSize: 15 }}>
              A local service business entered our court at position #48 for their primary keyword. Twelve months into their reign: position #3, organic traffic up 4.2×, leads from search grew from 3 to 31 per month.
            </p>
            {["#48 → #3 on primary keyword in 12 months", "420% organic traffic growth", "3 → 31 leads per month from organic search"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <CheckCircle2 size={14} style={{ color: G, flexShrink: 0 }} />
                <span style={{ color: "rgba(232,224,208,0.55)", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(8,6,2,0.9)", border: "1px solid rgba(212,175,55,0.1)", padding: 28, backdropFilter: "blur(20px)" }}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-white text-sm font-semibold">Keyword Position — 12 Month View</p>
              <span style={{ fontSize: 9, letterSpacing: "0.15em", padding: "4px 10px", background: "rgba(212,175,55,0.08)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.2)" }}>LIVE DATA</span>
            </div>
            <RankingChart />
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }} aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)", marginBottom: 16 }}>THE METHOD</p>
            <h2 id="process-heading" className="text-white font-black" style={{ fontSize: "clamp(32px,4.5vw,56px)", letterSpacing: "-0.02em" }}>
              No mystery.<br /><span className="gradient-text">Just conquest.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((step, i) => (
              <div key={i} className="relative group">
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-9 left-full w-full h-px z-0"
                    style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.2), transparent)" }} aria-hidden="true" />
                )}
                <div className="relative z-10 p-7 transition-all duration-300" style={{ background: "rgba(8,6,2,0.85)", border: "1px solid rgba(212,175,55,0.08)", backdropFilter: "blur(20px)" }}>
                  <div className="font-black gradient-text mb-6" style={{ fontSize: 44, letterSpacing: "-0.04em" }}>{step.step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p style={{ color: "rgba(232,224,208,0.38)", fontSize: 14, lineHeight: 1.75 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ borderTop: "1px solid rgba(212,175,55,0.06)", background: "rgba(0,0,0,0.3)" }} aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)", marginBottom: 16 }}>THE COURT</p>
            <h2 id="testimonials-heading" className="text-white font-black" style={{ fontSize: "clamp(32px,4.5vw,52px)", letterSpacing: "-0.02em" }}>
              Don&apos;t take our word for it
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { quote: "We were invisible on Google for two years. Within 6 months of working with Rank Royalty, we had three page-one rankings for our main services. The process was clear and the results were real.", name: "Sarah M.", role: "Owner, HVAC company" },
              { quote: "I've worked with two other SEO agencies before. The difference is night and day. These guys explain what they're doing and why. The monthly reports are the clearest I've ever seen.", name: "James R.", role: "Marketing Director, e-commerce brand" },
            ].map((t, i) => (
              <TiltCard key={i} className="p-8" glowColor="#D4AF37" style={{ background: "rgba(8,6,2,0.85)", border: "1px solid rgba(212,175,55,0.1)", backdropFilter: "blur(20px)" }}>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => <Star key={s} size={13} style={{ color: G, fill: G }} />)}
                </div>
                <blockquote>
                  <p style={{ color: "rgba(232,224,208,0.6)", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p style={{ color: "rgba(212,175,55,0.4)", fontSize: 11, letterSpacing: "0.1em", marginTop: 3 }}>{t.role.toUpperCase()}</p>
                  </footer>
                </blockquote>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }} aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)", marginBottom: 16 }}>THE OBSERVATORY</p>
            <h2 id="faq-heading" className="text-white font-black" style={{ fontSize: "clamp(32px,4.5vw,52px)", letterSpacing: "-0.02em" }}>
              Straight answers<br /><span className="gradient-text">from the throne</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-40 px-6" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-20 overflow-hidden" style={{ background: "rgba(8,6,2,0.95)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(30px)" }}>
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(212,175,55,0.06)" }} aria-hidden="true" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(139,105,20,0.08)" }} aria-hidden="true" />
            <p className="relative" style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(212,175,55,0.5)", marginBottom: 20 }}>YOUR REIGN AWAITS</p>
            <h2 id="cta-heading" className="relative text-white font-black mb-10" style={{ fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-0.02em" }}>
              Claim your position<br /><span className="gradient-text">at the top of search</span>
            </h2>
            <p className="relative max-w-md mx-auto mb-14" style={{ color: "rgba(232,224,208,0.38)", lineHeight: 1.85, fontSize: 15 }}>
              Start with a free 47-point SEO audit. No pitch, no pressure — a clear picture of where you stand and what it takes to own the throne.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="flex items-center justify-center gap-2 group font-bold transition-all duration-200"
                style={{ padding: "16px 42px", border: "1px solid #D4AF37", background: "rgba(212,175,55,0.08)", color: "#D4AF37", fontSize: 10, letterSpacing: "0.2em" }}>
                CLAIM YOUR THRONE
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link href="/services" className="flex items-center justify-center font-semibold transition-all duration-200"
                style={{ padding: "16px 42px", border: "1px solid rgba(232,224,208,0.08)", color: "rgba(232,224,208,0.4)", fontSize: 10, letterSpacing: "0.2em" }}>
                SURVEY THE DOMINION
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
