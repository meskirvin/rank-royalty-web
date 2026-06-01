import type { Metadata } from "next"
import ContactForm from "@/components/ContactForm"
import { Mail, Clock, CheckCircle2 } from "lucide-react"

export function generateMetadata(): Metadata {
  return {
    title: "Get a Free SEO Audit",
    description:
      "Request your free 47-point SEO audit from Rank Royalty. We'll analyze your site and give you a clear picture of what's holding your rankings back — no pitch, no pressure.",
    alternates: { canonical: "https://rankroyalty.com/contact" },
  }
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-6" aria-labelledby="contact-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-brand-green text-sm font-mono mb-4">// get your free audit</p>
            <h1 id="contact-heading" className="text-5xl font-bold text-white leading-tight mb-6">
              Let&apos;s see what&apos;s<br />
              <span className="gradient-text">holding you back</span>
            </h1>
            <p className="text-white/40 leading-relaxed mb-10">
              Fill out the form and we&apos;ll get back to you within one business day with a genuine analysis of your site — not a sales pitch.
            </p>
            <div className="space-y-5">
              {[
                { icon: CheckCircle2, text: "47-point technical and content audit" },
                { icon: CheckCircle2, text: "Competitor gap analysis included" },
                { icon: CheckCircle2, text: "Clear action plan, not a vague report" },
                { icon: Clock,        text: "Response within 1 business day" },
                { icon: Mail,         text: "No spam. Unsubscribe any time." },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-3">
                    <Icon size={15} className="text-brand-green shrink-0" aria-hidden="true" />
                    <span className="text-white/60 text-sm">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <div className="glass rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
