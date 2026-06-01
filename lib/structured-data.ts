export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rank Royalty",
  url: "https://rankroyalty.com",
  logo: "https://rankroyalty.com/logo.png",
  description: "Rank Royalty is a results-driven SEO agency helping businesses dominate search rankings through technical SEO, content strategy, and link building.",
  email: "hello@rankroyalty.com",
  sameAs: [
    "https://twitter.com/rankroyalty",
    "https://linkedin.com/company/rankroyalty",
  ],
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://rankroyalty.com/#business",
  name: "Rank Royalty",
  url: "https://rankroyalty.com",
  description: "SEO agency specializing in organic growth, technical optimization, and content strategy.",
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: ["SEO", "Search Engine Optimization", "Content Marketing", "Link Building", "Technical SEO", "Local SEO"],
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rank Royalty",
  url: "https://rankroyalty.com",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://rankroyalty.com/blog?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does SEO take to show results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most clients see measurable improvement in rankings within 3–6 months. Significant organic traffic growth typically follows at the 6–12 month mark, with compounding gains continuing beyond that. SEO is a long-term investment — but unlike paid ads, the results don't stop when you do.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Rank Royalty different from other SEO agencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We treat every client like a partner, not a retainer number. Our strategies are fully custom — no cookie-cutter packages. We build transparent, data-backed roadmaps and you see every move we make. Our team lives and breathes search — and our own website ranking proves it.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer local SEO services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Local SEO is one of our core specialties. We handle Google Business Profile optimization, local citation building, NAP consistency audits, and geo-targeted content strategies to help you dominate your local market.",
      },
    },
    {
      "@type": "Question",
      name: "How do you measure SEO success?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We track keyword rankings, organic traffic growth, click-through rates, conversion rates from organic, and ultimately revenue impact. Every client gets a live dashboard and a monthly report with clear before/after comparisons.",
      },
    },
    {
      "@type": "Question",
      name: "What does an SEO engagement with Rank Royalty look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We start with a deep technical and content audit, then build a 90-day roadmap. Month one is fixes and foundation. Month two is content and link building. Month three onwards is scaling what's working. You get weekly updates and a monthly strategy call.",
      },
    },
  ],
}

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Search Engine Optimization",
  provider: { "@type": "Organization", name: "Rank Royalty", url: "https://rankroyalty.com" },
  areaServed: { "@type": "Country", name: "United States" },
  description: "Full-service SEO including technical audits, content strategy, link building, and local SEO.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://rankroyalty.com/contact",
  },
}
