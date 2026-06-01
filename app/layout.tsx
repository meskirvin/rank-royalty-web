import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/structured-data"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import SmoothScroll from "@/components/SmoothScroll"
import Cursor from "@/components/Cursor"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })

const SITE_URL = "https://rankroyalty.com"

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Rank Royalty | We Don't Chase Rankings. We Crown Them.", template: "%s | Rank Royalty" },
  description: "Rank Royalty is an elite SEO agency. We enthrone brands in search through technical mastery, content strategy, and authoritative link building.",
  keywords: ["SEO agency", "search engine optimization", "technical SEO", "local SEO", "link building", "content strategy", "organic traffic growth", "SEO audit"],
  authors: [{ name: "Rank Royalty", url: SITE_URL }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", locale: "en_US", url: SITE_URL, siteName: "Rank Royalty",
    title: "Rank Royalty | We Don't Chase Rankings. We Crown Them.",
    description: "Elite SEO. Technical mastery, content strategy, and authoritative link building that enthrones brands in search.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rank Royalty SEO Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rank Royalty | We Don't Chase Rankings. We Crown Them.",
    description: "Elite SEO. Technical mastery, content strategy, and authoritative link building.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body>
        <SmoothScroll>
          <Cursor />
          <Navigation />
          <main className="page-content relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
