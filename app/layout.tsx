import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/structured-data"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import CursorGlow from "@/components/CursorGlow"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const SITE_URL = "https://rankroyalty.com"

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rank Royalty | SEO Agency That Actually Ranks",
    template: "%s | Rank Royalty",
  },
  description:
    "Rank Royalty is a results-driven SEO agency. We build organic growth engines through technical SEO, content strategy, and authoritative link building. No fluff — just rankings.",
  keywords: [
    "SEO agency", "search engine optimization", "technical SEO", "local SEO",
    "link building", "content strategy", "keyword research", "organic traffic growth",
    "SEO audit", "rank higher on Google",
  ],
  authors: [{ name: "Rank Royalty", url: SITE_URL }],
  creator: "Rank Royalty",
  publisher: "Rank Royalty",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rank Royalty",
    title: "Rank Royalty | SEO Agency That Actually Ranks",
    description: "We build organic growth engines. Technical SEO, content strategy, and link building that moves the needle.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rank Royalty SEO Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rank Royalty | SEO Agency That Actually Ranks",
    description: "We build organic growth engines through technical SEO, content strategy, and link building.",
    images: ["/og-image.png"],
    creator: "@rankroyalty",
  },
  alternates: { canonical: SITE_URL },
  verification: {
    google: "your-google-verification-token",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="noise">
        <CursorGlow />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
