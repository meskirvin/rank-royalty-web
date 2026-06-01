"use client"

import { useState } from "react"
import { Loader2, CheckCircle2, Send } from "lucide-react"

interface FormState {
  name: string; email: string; website: string
  business: string; goal: string; message: string
}

const GOALS = [
  "Rank higher for specific keywords",
  "Improve local / maps visibility",
  "Grow organic traffic overall",
  "Fix technical SEO issues",
  "Build authoritative backlinks",
  "Full SEO strategy overhaul",
]

const IS: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10,
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.88)", fontSize: 14, outline: "none",
  transition: "border-color 0.2s",
}
const LS: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 500,
  color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em",
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", website: "", business: "", goal: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  function set(k: keyof FormState, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email) { setError("Name and email are required."); return }
    setSending(true); setError("")
    // In production, wire this to your API/email service
    await new Promise(r => setTimeout(r, 1400))
    setSending(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mb-6">
          <CheckCircle2 size={32} className="text-brand-green" />
        </div>
        <h3 className="text-white text-xl font-bold mb-2">You&apos;re on the list</h3>
        <p className="text-white/40 text-sm max-w-xs">
          We&apos;ll review your site and reach out within one business day with your audit.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" style={LS}>Your Name *</label>
            <input id="name" type="text" style={IS} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Matt K." required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="email" style={LS}>Email *</label>
            <input id="email" type="email" style={IS} value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@company.com" required autoComplete="email" />
          </div>
        </div>

        <div>
          <label htmlFor="website" style={LS}>Website URL</label>
          <input id="website" type="url" style={IS} value={form.website} onChange={e => set("website", e.target.value)} placeholder="https://yoursite.com" autoComplete="url" />
        </div>

        <div>
          <label htmlFor="business" style={LS}>What does your business do?</label>
          <input id="business" type="text" style={IS} value={form.business} onChange={e => set("business", e.target.value)} placeholder="e.g. HVAC company in Phoenix, AZ" />
        </div>

        <div>
          <label style={LS}>Primary SEO goal</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {GOALS.map(g => (
              <button
                key={g} type="button"
                onClick={() => set("goal", g)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: form.goal === g ? "rgba(0,255,135,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${form.goal === g ? "rgba(0,255,135,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: form.goal === g ? "#00ff87" : "rgba(255,255,255,0.5)",
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" style={LS}>Anything else we should know?</label>
          <textarea
            id="message" rows={3}
            style={{ ...IS, resize: "vertical" }}
            value={form.message}
            onChange={e => set("message", e.target.value)}
            placeholder="Budget, timeline, past agency experience..."
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={sending}
          className="w-full py-4 bg-brand-green text-black font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {sending ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send My Audit Request</>}
        </button>

        <p className="text-center text-white/20 text-xs">No credit card. No spam. Unsubscribe any time.</p>
      </div>
    </form>
  )
}
