import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Zap, Eye, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "About Rank Royalty",
  description:
    "Rank Royalty is a lean, focused SEO agency built by practitioners — not salespeople. We believe in transparency, real results, and treating clients like partners.",
  alternates: { canonical: "https://rankroyalty.com/about" },
}

const VALUES = [
  { icon: Eye, title: "Radical Transparency", desc: "You see every move we make. No black boxes. No buzzwords. Just clear reporting on what's happening and why.", color: "#00ff87" },
  { icon: Target, title: "Results Over Vanity", desc: "We don't celebrate traffic that doesn't convert. We measure rankings, leads, and revenue impact — full stop.", color: "#7c3aed" },
  { icon: Zap, title: "Speed Without Shortcuts", desc: "We move fast and work smart — but we don't cut corners that risk your domain authority or Google's trust.", color: "#60a5fa" },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-6 text-center" aria-labelledby="about-heading">
        <p className="text-brand-green text-sm font-mono mb-4">// who we are</p>
        <h1 id="about-heading" className="text-5xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
          Built by people who<br />
          <span className="gradient-text">live in search results</span>
        </h1>
        <p className="mt-6 text-white/40 max-w-xl mx-auto leading-relaxed">
          Rank Royalty started because we got tired of watching agencies charge premium rates for mediocre results hidden behind confusing reports. So we built the agency we always wished existed.
        </p>
      </section>

      {/* Story */}
      <section className="py-20 px-6" aria-labelledby="story-heading">
        <div className="max-w-3xl mx-auto glass rounded-2xl p-10">
          <h2 id="story-heading" className="text-2xl font-bold text-white mb-6">The honest version</h2>
          <div className="space-y-4 text-white/50 leading-relaxed text-sm">
            <p>
              We&apos;re a small, focused team. We don&apos;t have hundreds of clients — and that&apos;s by design. Every client gets direct access to the strategists doing the actual work. No account managers passing messages between you and the people who matter.
            </p>
            <p>
              Our approach is simple: audit first, strategize second, execute third, and report everything. We don&apos;t start billing you until we have a real plan with real timelines and real expectations.
            </p>
            <p>
              We believe the best SEO agency is one you can actually trust. That means telling you the truth when something isn&apos;t working, celebrating wins honestly, and never padding reports with metrics that don&apos;t translate to revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="values-heading" className="text-3xl font-bold text-white text-center mb-12">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="glass rounded-2xl p-7">
                  <div className="p-2.5 rounded-lg w-fit mb-4" style={{ background: v.color + "15", border: `1px solid ${v.color}25` }}>
                    <Icon size={20} style={{ color: v.color }} aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" aria-labelledby="about-cta-heading">
        <div className="max-w-2xl mx-auto glass rounded-2xl p-10 border border-brand-green/10">
          <h2 id="about-cta-heading" className="text-3xl font-bold text-white mb-4">Work with a team that&apos;s all in</h2>
          <p className="text-white/40 mb-8">Start with a free audit. See exactly how we think before you commit to anything.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green text-black font-bold rounded-xl hover:bg-white transition-colors group">
            Get Free Audit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}
